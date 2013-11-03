(function() {
    window.Feeduck = (function() {
        var _initialized = false;
        function Feeduck() {}
        Feeduck.submitted = false;

        Feeduck.init = function(options) {
            var feedback = new this();
            var opts = $.extend({}, feedback.default_options, options);

            feedback.createFeedbackBox(opts);
            if (!_initialized) {
                _initialized = true;
                return feedback.bindEvents(opts);
            }
        };

        /*
            <div id="feeduck">
                <div class="feedback-container expanded">
                    <div class="form">
                        <textarea class="input" placeholder="건의사항"></textarea>
                        <div class="actions">
                            <button class="button submit">Send</button>
                        </div>
                    </div>
                    <div class="success">thanks!</div>
                </div>
            </div>
         */
        /*
            <div id="feeduck">
                <div id="feeduck-anchor">
                    <div class="feedback-container expanded">
                        <div class="form">
                            <textarea class="input" placeholder="건의사항"></textarea>
                            <div class="actions">
                                <button class="button submit">Send</button>
                            </div>
                        </div>
                        <div class="success">thanks!</div>
                    </div>
                </div>

                <iframe name="feeduck-iframe" id="feeduck-iframe" style="display:none;" onload="if(Feeduck.submitted) {alert('ok');}"></iframe>

                <form id="feedback-form" action="https://docs.google.com/forms/d/1ofpLhkCygELMQYxEzob-9gTubmHqlRa-vhSUMxJaGOg/formResponse" method="POST" target="feedback-iframe" onsubmit="Feeduck.submitted=true;">
                    <textarea name="entry.2016345497" rows="8" cols="0" class="ss-q-long" id="entry_2016345497" dir="auto"></textarea>
                </form>
            </div>
         */

        Feeduck.prototype.default_options = {
            //placeholder: 'Feedback? Let us know here.',
            //thanks_message: "<p>Thanks for your feedback!</p>\n<div class=\"indent\">\n  - siong1987\n</div>",
            //button_name: "Send",
            placeholder: '의견을 남겨주세요.',
            thanks_message: "<p>소중한 의견 감사합니다.</p>",
            button_name: "전송",
            send_callback: function(text) {}
        };

        Feeduck.prototype.createFeedbackBox = function(opts) {
            return $('#feeduck').html("" + 
                    "<div id='feeduck-anchor'>\n" + 
                    "  <div class='feeduck-container'>\n" + 
                    "    <div class='form'>\n" + 
                    "      <textarea class='input' placeholder='" + opts.placeholder + "'></textarea>\n" + 
                    "      <div class='actions'>\n" + 
                    "        <button class='button submit'>" + opts.button_name + "</button>\n" + 
                    "      </div>\n" + 
                    "    </div>\n" + 
                    "    <div class='success'>" + opts.thanks_message + "</div>\n" + 
                    "  </div>" + 
                    "</div>" + 

                    "<iframe name='feeduck-iframe' id='feeduck-iframe' style='display:none;' onload='if(Feeduck.submitted) {}'></iframe>\n" +

                    "<form id='feeduck-form' action='https://docs.google.com/forms/d/" + opts.form_id + "/formResponse' method='POST' target='feedback-iframe' onsubmit='Feeduck.submitted=true;' style='display: none;'>\n" +
                    "    <textarea name='entry." + opts.entry_id + "' rows='8' cols='0' class='ss-q-long' id='entry_" + opts.entry_id + "' dir='auto'></textarea>\n" +
                    "</form>\n" +

                    "");
        };

        Feeduck.prototype.bindEvents = function(opts) {
            // add .expanded on focus
            $(document).on('focus', '#feeduck textarea', function() {
                return $(this).closest('.feeduck-container').addClass('expanded');
            });

            // remove .expanded.success-state if clicked elsewhere
            $(document).mouseup(function(e) {
                var container = $("#feeduck");
                var textarea  = container.find('textarea');
                if (container.has(e.target).length === 0) {
                    textarea.val('');
                    return container.find('.expanded').removeClass('expanded success-state');
                }
            });

            // add .success-state on send button
            return $(document).on('click', '#feeduck .button', function() {
                var container = $("#feeduck");
                var textarea  = container.find('textarea');
                if (textarea.val() !== '') {
                    $(this).closest('.feeduck-container').addClass('success-state');
                    // callback
                    var form = $('form#feeduck-form');
                    form.find('textarea').text(textarea.val());
                    form.submit();
                    // user callback
                    opts.send_callback(textarea.val());

                    // restore after 5s
                    return setTimeout(function() {
                        textarea.val('');
                        return container.removeClass('success-state expanded');
                    }, 5000);
                }
            });
        };

        return Feeduck;
    })();

}).call(this);
