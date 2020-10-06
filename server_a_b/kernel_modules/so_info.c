#include <linux/init.h>
#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/fs.h>
#include <linux/seq_file.h>
#include <linux/mm.h>
#include <linux/proc_fs.h>

static int my_proc_show(struct seq_file *m, void *v){
    struct sysinfo i;
	long available;
	long ram_usage; 
    si_meminfo(&i);
	available = si_mem_available();
	ram_usage = ((i.totalram - available - i.bufferram)* 100)/(i.totalram) ;
    seq_printf(m, "%ld;25", ram_usage);
    return 0;
}

static ssize_t my_proc_write(struct file* file, const char __user *buffer, size_t count, loff_t *f_pos){
    return 0;
}

static int my_proc_open(struct inode *inode, struct file *file){
	return single_open(file, my_proc_show, NULL);
}

static struct file_operations my_fops={
	.owner = THIS_MODULE,
	.open = my_proc_open,
	.release = single_release,
	.read = seq_read,
	.llseek = seq_lseek,
	.write = my_proc_write
};

static int __init so_info_init(void){
	struct proc_dir_entry *entry;
	entry = proc_create("so_info", 0777, NULL, &my_fops);
	if(!entry) {
		return -1;
	}
	return 0;
}

static void __exit so_info_exit(void){
	remove_proc_entry("so_info", NULL);
}

module_init(so_info_init);
module_exit(so_info_exit);
MODULE_LICENSE("GPL");