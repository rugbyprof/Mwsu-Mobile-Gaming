/* global Phaser */
// The purpose of this file is to override the _checkFeatures functions of the Phaser library which makes a check for localStorage.
// In Chrome apps, this needs to be a check for chrome.storage.local
'use strict';
(function () {
	Phaser.Device.prototype._checkFeatures = function () {

        this.canvas = !!window.CanvasRenderingContext2D || this.cocoonJS;

        // Check if chrome.storage exists, if not, don't support local storage.
        if (chrome.storage && chrome.storage.local) {
            // Chrome app
            this.localStorage = true;
        } else {
            this.localStorage = false;
        }

        // The rest of this file is the same as the original function.
        this.file = !!window.File && !!window.FileReader && !!window.FileList && !!window.Blob;
        this.fileSystem = !!window.requestFileSystem;
        this.webGL = ( function () { try { var canvas = document.createElement( 'canvas' ); return !! window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ); } catch( e ) { return false; } } )();

        if (this.webGL === null || this.webGL === false)
        {
            this.webGL = false;
        }
        else
        {
            this.webGL = true;
        }

        this.worker = !!window.Worker;

        if ('ontouchstart' in document.documentElement || (window.navigator.maxTouchPoints && window.navigator.maxTouchPoints > 1))
        {
            this.touch = true;
        }

        if (window.navigator.msPointerEnabled || window.navigator.pointerEnabled)
        {
            this.mspointer = true;
        }

        this.pointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

        this.quirksMode = (document.compatMode === 'CSS1Compat') ? false : true;

        this.getUserMedia = !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

    };
})();

