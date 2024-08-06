import Tracker from '@openreplay/tracker';

function startTracker(key) {

    console.log('Starting tracker...')
    console.log(key);

    const trackerConfig = {
        projectKey: key
    }

    const tracker = new Tracker(trackerConfig);

    tracker.start();

    return {
        tracker
    }
}

export default startTracker;