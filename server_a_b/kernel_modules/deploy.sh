sudo su
cd /proc
rmmod so_info
cd /home/ubuntu/src/so_info/
make
insmod so_info.ko
