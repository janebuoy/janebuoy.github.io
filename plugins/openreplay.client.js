import startTracker from '../utils/tracker'

export default defineNuxtPlugin(nuxtApp => {
    console.log('Nuxt App:', nuxtApp);
    console.log('Using client plugin...');
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