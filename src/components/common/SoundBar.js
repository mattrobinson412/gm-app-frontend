import React from "react";
import graceMusicApi from "../../api/api";


/** Renders a single Soundcloud widget for playback in a course lesson.
 * 
 */

function SoundBar() {
    function init() {
        SC.initialize({
            client_id: 'YOUR_CLIENT_ID'
        });

        var track_url = 'https://soundcloud.com/forss/flickermood';
        SC.oEmbed(track_url, { auto_play: true }).then(function(oEmbed) {
        console.log('oEmbed response: ', oEmbed);
        });
    };

    return (
        <div>
            <script src="https://connect.soundcloud.com/sdk/sdk-3.3.2.js"></script>

            <script>{init}</script>
        </div>
    );
}

export default SoundBar;