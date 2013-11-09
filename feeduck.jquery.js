(function() {
    window.Feeduck = (function() {
        var _initialized = false;
        var _submitted = false;

        function Feeduck() {}

        Feeduck.init = function(options) {
            var feedback = new this();
            var opts = $.extend({}, feedback.default_options, options);

            feedback.$el = feedback.createFeedbackBox(opts);
            if (!_initialized) {
                _initialized = true;
                feedback.bindEvents(opts);
            }
            return feedback;
        };

        Feeduck.prototype.default_options = {
            //placeholder: 'Feedback? Let us know here.',
            //thanks_message: "<p>Thanks for your feedback!</p>\n<div class=\"indent\">\n  - siong1987\n</div>",
            //button_name: "Send",
            placeholder: '의견을 남겨주세요.',
            thanks_message: "<p>소중한 의견 감사합니다.</p>",
            button_name: "전송",
            send_callback: function(text) {}
        };

        /*
            <div id="feeduck">
                <div id="feeduck-anchor">
                    <div class="feedback-container expanded">
                         <form id='feeduck-form' class='form' action='https://docs.google.com/forms/d/FORMID/formResponse' method='POST' target='feeduck-iframe'>
                             <textarea name='entry.ENTRYID' id='entry_ENTRYID' class='input' placeholder='" + opts.placeholder + "'></textarea>
                             <div class='actions'>
                                 <button class='button submit'>" + opts.button_name + "</button>
                             </div>
                         </form>
                        <div class="success">thanks!</div>
                    </div>
                </div>
                <iframe name="feeduck-iframe" id="feeduck-iframe"></iframe>
            </div>
         */

        Feeduck.prototype.createFeedbackBox = function(opts) {
            var feeduck = $('#feeduck');

            // create one if doesn't exist
            if (feeduck.length === 0) {
                feeduck = $('<div id="feeduck"/>').appendTo($('body'));
            }

            return feeduck.html("" + 
                    "<div id='feeduck-anchor'>\n" + 
                    "  <div class='feeduck-container'>\n" + 
                    "    <form id='feeduck-form' class='form' action='https://docs.google.com/forms/d/" + opts.form_id + "/formResponse' method='POST' target='feeduck-iframe'>\n" +
                    "        <textarea name='entry." + opts.entry_id + "' id='entry_" + opts.entry_id + "' class='input' placeholder='" + opts.placeholder + "'></textarea>\n" + 
                    "        <div class='actions'>\n" + 
                    "            <button class='button submit'>" + opts.button_name + "</button>\n" + 
                    "        </div>\n" + 
                    "    </form>\n" + 
                    "    <div class='success'>" + opts.thanks_message + "</div>\n" + 
                    "  </div>\n" + 
                    "</div>\n" + 
                    "<iframe name='feeduck-iframe' id='feeduck-iframe'></iframe>\n" +
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

            // validate
            $(document).on('click', '#feeduck .button', function(e) {
                var textarea = $("#feeduck textarea");
                if (textarea.val() === '') {
                    e.preventDefault();
                }
            });

            // flag submitted
            $('#feeduck form').on('submit', function(e) {
                _submitted = true;
            });

            // add .success-state on send
            $('#feeduck-iframe').on('load', function() {
                if (_submitted) {
                    var feeduck = $("#feeduck");
                    var textarea  = feeduck.find('textarea');
                    var container = feeduck.find('.feeduck-container');

                    // callback
                    opts.send_callback(textarea.val());

                    // reshrink size after 5s
                    container.addClass('success-state');
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
