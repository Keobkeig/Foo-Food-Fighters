#/bin/bash



a=1

# lt is less than operator

#Iterate the loop until a less than 10

while [ $a -lt 5 ]
do
# Print the values

python3.11 model.py images/$a.jpg
# increment the value
a=`expr $a + 1`
done