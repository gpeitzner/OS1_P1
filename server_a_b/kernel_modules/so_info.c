#include <linux/init.h>
#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/fs.h>
#include <linux/seq_file.h>
#include <linux/mm.h>
#include <linux/proc_fs.h>
#include <linux/cpumask.h>
#include <linux/interrupt.h>
#include <linux/kernel_stat.h>
#include <linux/sched.h>
#include <linux/sched/stat.h>
#include <linux/slab.h>
#include <linux/time.h>
#include <linux/irqnr.h>
#include <linux/sched/cputime.h>
#include <linux/tick.h>

u64 t_usage0, t_total0 = 0;

#ifdef arch_idle_time

static u64 get_idle_time(struct kernel_cpustat *kcs, int cpu)
{
	u64 idle;

	idle = kcs->cpustat[CPUTIME_IDLE];
	if (cpu_online(cpu) && !nr_iowait_cpu(cpu))
		idle += arch_idle_time(cpu);
	return idle;
}

static u64 get_iowait_time(struct kernel_cpustat *kcs, int cpu)
{
	u64 iowait;

	iowait = kcs->cpustat[CPUTIME_IOWAIT];
	if (cpu_online(cpu) && nr_iowait_cpu(cpu))
		iowait += arch_idle_time(cpu);
	return iowait;
}

#else

static u64 get_idle_time(struct kernel_cpustat *kcs, int cpu)
{
	u64 idle, idle_usecs = -1ULL;

	if (cpu_online(cpu))
		idle_usecs = get_cpu_idle_time_us(cpu, NULL);

	if (idle_usecs == -1ULL)
		/* !NO_HZ or cpu offline so we can rely on cpustat.idle */
		idle = kcs->cpustat[CPUTIME_IDLE];
	else
		idle = idle_usecs * NSEC_PER_USEC;

	return idle;
}

static u64 get_iowait_time(struct kernel_cpustat *kcs, int cpu)
{
	u64 iowait, iowait_usecs = -1ULL;

	if (cpu_online(cpu))
		iowait_usecs = get_cpu_iowait_time_us(cpu, NULL);

	if (iowait_usecs == -1ULL)
		/* !NO_HZ or cpu offline so we can rely on cpustat.iowait */
		iowait = kcs->cpustat[CPUTIME_IOWAIT];
	else
		iowait = iowait_usecs * NSEC_PER_USEC;

	return iowait;
}

#endif

static int my_proc_show(struct seq_file *m, void *v)
{
	struct sysinfo info;
	long available, ram_usage;
	int i, j;
	u64 user, nice, system, idle, iowait, irq, softirq, steal, t_total, t_idle, t_usage, cpu_usage;
	u64 guest, guest_nice;
	u64 sum = 0;
	u64 sum_softirq = 0;
	unsigned int per_softirq_sums[NR_SOFTIRQS] = {0};
	struct timespec64 boottime;
	//RAM
	si_meminfo(&info);
	available = si_mem_available();
	ram_usage = ((info.totalram - available - info.bufferram) * 100) / (info.totalram);
	//CPU
	user = nice = system = idle = iowait =
		irq = softirq = steal = 0;
	guest = guest_nice = 0;
	getboottime64(&boottime);

	for_each_possible_cpu(i)
	{
		struct kernel_cpustat *kcs = &kcpustat_cpu(i);

		user += kcs->cpustat[CPUTIME_USER];
		nice += kcs->cpustat[CPUTIME_NICE];
		system += kcs->cpustat[CPUTIME_SYSTEM];
		idle += get_idle_time(kcs, i);
		iowait += get_iowait_time(kcs, i);
		irq += kcs->cpustat[CPUTIME_IRQ];
		softirq += kcs->cpustat[CPUTIME_SOFTIRQ];
		steal += kcs->cpustat[CPUTIME_STEAL];
		guest += kcs->cpustat[CPUTIME_GUEST];
		guest_nice += kcs->cpustat[CPUTIME_GUEST_NICE];
		sum += kstat_cpu_irqs_sum(i);

		for (j = 0; j < NR_SOFTIRQS; j++)
		{
			unsigned int softirq_stat = kstat_softirqs_cpu(j, i);

			per_softirq_sums[j] += softirq_stat;
			sum_softirq += softirq_stat;
		}
	}
	t_total = (user + nice + system + idle + iowait + irq + softirq + steal) - t_total0;
	t_total0 = user + nice + system + idle + iowait + irq + softirq + steal;
	t_idle = idle + iowait;
	t_usage = (t_total - t_idle) - t_usage0;
	t_usage0 = t_total - t_idle;
	cpu_usage = ((t_usage * 100) / t_total) / 10000000000;
	seq_printf(m, "%ld;%lld", ram_usage, cpu_usage);
	return 0;
}

static ssize_t my_proc_write(struct file *file, const char __user *buffer, size_t count, loff_t *f_pos)
{
	return 0;
}

static int my_proc_open(struct inode *inode, struct file *file)
{
	return single_open(file, my_proc_show, NULL);
}

static struct file_operations my_fops = {
	.owner = THIS_MODULE,
	.open = my_proc_open,
	.release = single_release,
	.read = seq_read,
	.llseek = seq_lseek,
	.write = my_proc_write};

static int __init so_info_init(void)
{
	struct proc_dir_entry *entry;
	entry = proc_create("so_info", 0777, NULL, &my_fops);
	if (!entry)
	{
		return -1;
	}
	return 0;
}

static void __exit so_info_exit(void)
{
	remove_proc_entry("so_info", NULL);
}

module_init(so_info_init);
module_exit(so_info_exit);
MODULE_LICENSE("GPL");