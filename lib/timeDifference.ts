
export function timeDifference(startParam:string | number, endParam?:string | number) {

    const start = new Date(startParam);
    const end = endParam ? new Date(endParam) : null;

    const time1 = start.getTime();
    const time2 = end ? end.getTime() : Date.now();

    const diff = time2 - time1;
    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));

    return {
        months: Math.floor(diff / (1000 * 60 * 60 * 24 * 30)),
        days: Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
        years: Math.floor(months / 12),
    }
}
