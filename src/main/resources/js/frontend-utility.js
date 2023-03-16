/*-
 * #%L
 * blog-plugin
 * %%
 * Copyright (C) 2023 The Plugin Authors
 * %%
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
 * #L%
 */
// /download/resources/com.linked-planet.plugin.jira.blog-plugin:frontend/js/frontend.min.js
function initFrontendApp(starterFunc) {
    var devMode = window.location.port === '2990' || window.location.port === '1990';
    console.log('loading frontend app [devMode: ' + devMode + ' ...]');
    var scriptUrl = (devMode)
        ? 'http://localhost:8080/frontend/frontend.js'
        : window.location.origin + '/download/resources/com.linked-planet.plugin.jira.blog-plugin/js/frontend-min.js';
    var script = document.getElementById('load-frontend-script');
    if (script == null) {
        script = document.createElement('script');
        script.id = 'load-frontend-script';
        script.src = scriptUrl;
        document.head.appendChild(script);
        script.addEventListener('load', function () {
            console.log('loading frontend app [devMode: ' + devMode + '] DONE');
            starterFunc();
        });
    } else {
        console.log('loading frontend app [devMode: ' + devMode + '] DONE');
        starterFunc();
    }
}
