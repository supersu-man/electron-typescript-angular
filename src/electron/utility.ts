import url from 'url';
import path from 'path';

export function getAppUrl(route: string = '') {
    if (process.argv.includes('--dev')) {
        return `http://localhost:4200/#/${route}`;
    }
    return url.format({
        pathname: path.join(__dirname, 'browser/index.html'),
        protocol: 'file',
        slashes: true
    }) + `#/${route}`;
}

export function getAssetUrl(asset: string) {
    const isDev = process.argv.includes('--dev')
    return path.resolve(__dirname, isDev ? '../src/assets' : 'browser/assets', asset);
}

export function resolveElectronPath(file: string): string {
    return path.resolve(__dirname, file);
}