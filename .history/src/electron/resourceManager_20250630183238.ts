import osUtils from "os-utils";

const POLLING_INTERVAL = 500;

export function pollResources() {
    setInterval(async () => {
        const cpuUsage = await getCpuUsage();
        const ramUsage = getRamUsage();
        const storageData = await getStorageData();
        console.log({cpuUsage, ramUsage, storageUsage: storageData.usage, totalStorage: storageData.total});
    }, POLLING_INTERVAL);
}

function getCpuUsage() {
    return new Promise((resolve) => {
        osUtils.cpuUsage(resolve)
    })
}

function getRamUsage() {
    return 1 - osUtils.freememPercentage();
}

async function getStorageData() {
    const path = process.platform === 'win32' ? 'C:\\' : '/';
    const checkDiskSpace = (await import('check-disk-space')).default;
    const { size, free } = await checkDiskSpace(path);

    return {
        total: Math.floor(size / (1024 * 1024 * 1024)), // GB
        usage: 1 - free / size,
    };
}