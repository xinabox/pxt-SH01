#include "SH01.h"

parallel::parallel()
{

}

namespace parallel_run
{
	//%
	int startParallel(Action a)
	{
		runInParallel(a);
		return 1;
	}
}
