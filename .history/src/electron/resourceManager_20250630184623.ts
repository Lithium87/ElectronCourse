import osUtils from "os-utils";

import os from "os";

const POLLING_INTERVAL = 500;

export function pollResources() {
    setInterval(async () => {
        const cpuUsage = await getCpuUsage();
        const ramUsage = getRamUsage();
        console.log({cpuUsage, ramUsage});
    }, POLLING_INTERVAL);
}

export function getStaticData() {
    const cpuModel = os.cpus()[0].model;
    const totalMemoryGB = Math.floor(os.totalmem() / (1024 * 1024 * 1024)); // Convert bytes to GB

    return {
        cpuModel,
        totalMemoryGB,
        platform: os.platform(),
        arch: os.arch(),
        release: os.release(),
    }
}

function getCpuUsage() {
    return new Promise((resolve) => {
        osUtils.cpuUsage(resolve)
    })
}

function getRamUsage() {
    return 1 - osUtils.freememPercentage();
}