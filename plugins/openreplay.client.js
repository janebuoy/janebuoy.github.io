import startTracker from '../utils/tracker'

export default defineNuxtPlugin(nuxtApp => {
    return {
        provide: {
            startTracking: () => {
                let key = useRuntimeConfig().public.openreplayProjectKey
                
                startTracker({
                    projectKey: key
                })
            }
        }
    }
})