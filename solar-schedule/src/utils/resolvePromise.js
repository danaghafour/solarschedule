// Original code taken from the lab

export default function resolvePromise(prms, promiseState, processDataFunc) {
    if (!prms) {
        return;
    }

    function saveResultACB(res) {
        if (promiseState.promise != prms) {
            return;
        }

        promiseState.data = res;
    }

    function handleErrorACB(error) {
        if (promiseState.promise != prms) {
            return;
        }
        promiseState.error = error;
    }

    promiseState.promise = prms;
    promiseState.data = null;
    promiseState.error = null;

    prms.then(saveResultACB).then(processDataFunc).catch(handleErrorACB);
}
