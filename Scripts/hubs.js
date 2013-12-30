/*!
 * ASP.NET SignalR JavaScript Library v1.1.2
 * http://signalr.net/
 *
 * Copyright Microsoft Open Technologies, Inc. All rights reserved.
 * Licensed under the Apache 2.0
 * https://github.com/SignalR/SignalR/blob/master/LICENSE.md
 *
 */

/// <reference path="..\..\SignalR.Client.JS\Scripts\jquery-1.6.4.js" />
/// <reference path="jquery.signalR.js" />
(function ($, window) {
    /// <param name="$" type="jQuery" />
    "use strict";

    if (typeof ($.signalR) !== "function") {
        throw new Error("SignalR: SignalR is not loaded. Please ensure jquery.signalR-x.js is referenced before ~/signalr/hubs.");
    }

    var signalR = $.signalR;

    function makeProxyCallback(hub, callback) {
        return function () {
            // Call the client hub method
            callback.apply(hub, $.makeArray(arguments));
        };
    }

    function registerHubProxies(instance, shouldSubscribe) {
        var key, hub, memberKey, memberValue, subscriptionMethod;

        for (key in instance) {
            if (instance.hasOwnProperty(key)) {
                hub = instance[key];

                if (!(hub.hubName)) {
                    // Not a client hub
                    continue;
                }

                if (shouldSubscribe) {
                    // We want to subscribe to the hub events
                    subscriptionMethod = hub.on;
                }
                else {
                    // We want to unsubscribe from the hub events
                    subscriptionMethod = hub.off;
                }

                // Loop through all members on the hub and find client hub functions to subscribe/unsubscribe
                for (memberKey in hub.client) {
                    if (hub.client.hasOwnProperty(memberKey)) {
                        memberValue = hub.client[memberKey];

                        if (!$.isFunction(memberValue)) {
                            // Not a client hub function
                            continue;
                        }

                        subscriptionMethod.call(hub, memberKey, makeProxyCallback(hub, memberValue));
                    }
                }
            }
        }
    }

    $.hubConnection.prototype.createHubProxies = function () {
        var proxies = {};
        this.starting(function () {
            // Register the hub proxies as subscribed
            // (instance, shouldSubscribe)
            registerHubProxies(proxies, true);

            this._registerSubscribedHubs();
        }).disconnected(function () {
            // Unsubscribe all hub proxies when we "disconnect".  This is to ensure that we do not re-add functional call backs.
            // (instance, shouldSubscribe)
            registerHubProxies(proxies, false);
        });

        proxies.viewerHub = this.createHubProxy('viewerHub');
        proxies.viewerHub.client = {};
        proxies.viewerHub.server = {
            broadcastDocumentScale: function (userGuid, privateKey, fileGuid, scale) {
                return proxies.viewerHub.invoke.apply(proxies.viewerHub, $.merge(["BroadcastDocumentScale"], $.makeArray(arguments)));
             },

            broadcastDocumentScroll: function (userGuid, privateKey, fileGuid, horizontalScrollPortion, verticalScrollPosition, scale) {
                return proxies.viewerHub.invoke.apply(proxies.viewerHub, $.merge(["BroadcastDocumentScroll"], $.makeArray(arguments)));
             },

            broadcastMouseCursorPosition: function (userGuid, privateKey, fileGuid, left, top, scale, scrollTop) {
                return proxies.viewerHub.invoke.apply(proxies.viewerHub, $.merge(["BroadcastMouseCursorPosition"], $.makeArray(arguments)));
             },

            broadcastSlaveConnected: function (fileGuid) {
                return proxies.viewerHub.invoke.apply(proxies.viewerHub, $.merge(["BroadcastSlaveConnected"], $.makeArray(arguments)));
             },

            getClient: function (connectionId) {
                return proxies.viewerHub.invoke.apply(proxies.viewerHub, $.merge(["GetClient"], $.makeArray(arguments)));
             },

            getConnectionIdsToCall: function (connectionIdToExclude, collaboratorGuids) {
                return proxies.viewerHub.invoke.apply(proxies.viewerHub, $.merge(["GetConnectionIdsToCall"], $.makeArray(arguments)));
             },

            getConnectionUser: function (connectionId) {
                return proxies.viewerHub.invoke.apply(proxies.viewerHub, $.merge(["GetConnectionUser"], $.makeArray(arguments)));
             },

            setDocumentGuidForConnection: function (documentGuid) {
                return proxies.viewerHub.invoke.apply(proxies.viewerHub, $.merge(["SetDocumentGuidForConnection"], $.makeArray(arguments)));
             },

            setUserGuidForConnection: function (connectionGuid, userGuid) {
                return proxies.viewerHub.invoke.apply(proxies.viewerHub, $.merge(["SetUserGuidForConnection"], $.makeArray(arguments)));
             }
        };

        return proxies;
    };

    signalR.hub = $.hubConnection("/signalr1_1_2", { useDefaultPath: false });
    $.extend(signalR, signalR.hub.createHubProxies());

}(window.jQuery, window));