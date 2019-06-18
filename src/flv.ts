/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Features from './core/features';
import {BaseLoader, LoaderStatus, LoaderErrors} from './io/loader';
import FlvPlayer from './player/flv-player';
import NativePlayer from './player/native-player';
import PlayerEvents from './player/player-events';
import {ErrorTypes, ErrorDetails} from './player/player-errors';
import LoggingControl from './utils/logging-control';
import {InvalidArgumentException} from './utils/exception';
import { MediaDataSource, Config } from './types';

// factory method
function createPlayer(mediaDataSource: MediaDataSource, optionalConfig: Config) {
    let mds = mediaDataSource;
    if (mds == null || typeof mds !== 'object') {
        throw new InvalidArgumentException('MediaDataSource must be an javascript object!');
    }

    if (!mds.hasOwnProperty('type')) {
        throw new InvalidArgumentException('MediaDataSource must has type field to indicate video file type!');
    }

    switch (mds.type) {
        case 'flv':
            return new FlvPlayer(mds, optionalConfig);
        default:
            return new NativePlayer(mds, optionalConfig);
    }
}


// feature detection
function isSupported() {
    return Features.supportMSEH264Playback();
}

function getFeatureList() {
    return Features.getFeatureList();
}


// interfaces
export const flvjs = {
    createPlayer,
    isSupported,
    getFeatureList,
    BaseLoader,
    LoaderStatus,
    LoaderErrors,
    Events: PlayerEvents,
    ErrorTypes,
    ErrorDetails,
    FlvPlayer,
    NativePlayer,
    LoggingControl,
    get version () {
        return '__VERSION__';
    }
};
