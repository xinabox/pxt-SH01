#include "parallel.h"

ParallelRun::ParallelRun()
{

}

/*Test::playParallel(pxt::Action a)
{
#ifdef CODAL_I2C
    runInParallel(a);
#else
    runInParallel(a,b);
#endif

return 1;
}*/

namespace parall
{
	static ParallelRun* xParallelRun =  new ParallelRun();
	
	//%
	int startParallel(Action a)
	{
		runInParallel(a);
		return 1;
	}
}
