import Tracker from '@openreplay/tracker';

function startTracker(key) {

    console.log('Starting tracker...')

    const trackerConfig = {
        projectKey: key.projectKey
    }

    const tracker = new Tracker(trackerConfig);

    tracker.start();

    return {
        tracker
    }
}

export default startTracker;