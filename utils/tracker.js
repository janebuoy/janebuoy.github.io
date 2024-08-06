import Tracker from '@openreplay/tracker';

export function startTracker(config) {

    console.log('Starting tracker...')

    const trackerConfig = {
        projectKey: process.env.NUXT_PUBLIC_OPENREPLAY_PROJECT_KEY
    }

    const tracker = new Tracker(trackerConfig);

    tracker.start();

    return {
        tracker
    }
}