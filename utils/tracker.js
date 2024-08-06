import Tracker from '@openreplay/tracker';

export function startTracker(config) {

    console.log('Starting tracker...')

    const trackerConfig = {
        projectKey: config?.projectKey
    }

    const tracker = new Tracker(trackerConfig);

    tracker.start();

    return {
        tracker
    }
}