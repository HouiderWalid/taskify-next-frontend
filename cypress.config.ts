import {defineConfig} from "cypress";
import {
    startMockServer,
    mock,
    MockData,
    stopMockServer,
    resetMocks
} from './cypress/helpers/mockApiServer';

export default defineConfig({
    e2e: {
        baseUrl: "http://localhost:3000",
        setupNodeEvents(on, config) {
            on('task', {
                async startMockServer() {
                    await startMockServer();
                    return null;
                },
                async setApiMock(mockData: MockData) {
                    await mock(mockData)
                    return null;
                },
                resetApiMocks() {
                    resetMocks();
                    return null;
                },
                async stopMockServer() {
                    await stopMockServer()
                    return null;
                }
            });
        }
    },

    component: {
        devServer: {
            framework: "next",
            bundler: "webpack",
        }
    }
});
