/*-
 *
 * Hedera JSON RPC Relay
 *
 * Copyright (C) 2022-2024 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { TestScenarioBuilder } from '../../lib/common.js';
import { subscribeEvents } from '../../lib/constants.js';
import { connectToWebSocket, isNonErrorResponse } from './common.js';

const url = __ENV.WS_RELAY_BASE_URL;
const methodName = 'eth_subscribe';
const scenarioName = methodName + '_newHeads';

const { options, run } = new TestScenarioBuilder()
  .name(scenarioName) // use unique scenario name among all tests
  .request(() => connectToWebSocket(
    url,
    methodName,
    scenarioName,
    [subscribeEvents.newHeads],
    { methodName: (r) => isNonErrorResponse(r) }
  ))
  .build();

export { options, run };
