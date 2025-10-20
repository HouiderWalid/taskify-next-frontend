import {getLocal, Mockttp} from 'mockttp'
import path from "node:path";
import fs from "node:fs";

let server: Mockttp;
const PORT = 9000

async function startMockServer() {
    server = getLocal();
    await server.start(PORT);
    return server;
}

export type MockData = {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    uri: string,
    statusCode: number,
    fixture: string,
}

async function mock(mockData: MockData) {

    if (!server) {
        throw new Error('Mock server has not been started.');
    }

    const methodMap = {
        GET: server.forGet,
        POST: server.forPost,
        PUT: server.forPut,
        PATCH: server.forPatch,
        DELETE: server.forDelete,
        OPTIONS: server.forOptions,
        HEAD: server.forHead,
    };

    const fixturePath = path.resolve('cypress/fixtures/', mockData.fixture);
    const fileContent = fs.readFileSync(fixturePath, 'utf-8');
    const responseData = JSON.parse(fileContent)
    const url = 'http://localhost:' + PORT + (mockData.uri.startsWith('/') ? '' : '/') + mockData.uri

    const createMock = methodMap[mockData.method]
        ? methodMap[mockData.method].bind(server)
        : server.forGet.bind(server);

    await createMock(url)
        .thenReply(mockData.statusCode, JSON.stringify(responseData));
}

async function stopMockServer() {

    if (!server) {
        throw new Error('Mock server has not been started.');
    }

    await server.stop()
}

function resetMocks() {

    if (!server) {
        throw new Error('Mock server has not been started.');
    }

    server.reset()
}

export {startMockServer, stopMockServer, resetMocks, mock};