// The use of fabs function
#include <stdio.h>
#include <math.h>  // header file

int main() 
{
    
    int x, y;
    x = 1998;
    y = -500;

    printf("Absolute value of %d is %1f\n", x, fabs(x));
    printf("Absolute value of %d is %1f\n", y, fabs(y));

    return 0;

}