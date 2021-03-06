/**
 * Roundcube Notes Plugin
 *
 * @version 1.5.1
 * @author Offerel
 * @copyright Copyright (c) 2019, Offerel
 * @license GNU General Public License, version 3
 */
window.rcmail && rcmail.addEventListener("init", function(a) {
    rcmail.register_command("newnote", new_note, !0);
    rcmail.register_command("editnote", edit_note, !0);
    rcmail.register_command("deletenote", delete_note, !0);
    rcmail.register_command("sendnote", send_note, !0);
    rcmail.register_command("addnote", add_note, !0);
    rcmail.register_command("htmlnote", new_note, !0);
    rcmail.register_command("mdnote", new_note, !0);
    rcmail.register_command("txtnote", new_note, !0);
});

function add_note() {
    document.getElementById("upl").click()
}

function new_note(a) {
    format = a ? a : "";
    $.ajax({
        type: "POST",
        url: "plugins/primitivenotes/notes.php",
        data: {
            editHeader: "1",
            filename: ""
        },
        success: function(a) {
            $("#notescontentframe").contents().find("div#main_header").html(a)
        }
    });
    $.ajax({
        type: "POST",
        url: "plugins/primitivenotes/notes.php",
        data: {
            editNote: "1",
            filename: "",
            format: format
        },
        success: function(a) {
            $("#notescontentframe").contents().find("div#main_area").html(a)
        }
    })
}

function edit_note() {
    var a = window.frames.notescontentframe.document.getElementById("fname").value,
        b = a.substr(a.lastIndexOf(".") + 1);
    $.ajax({
        type: "POST",
        url: "plugins/primitivenotes/notes.php",
        data: {
            editHeader: "1",
            filename: a
        },
        success: function(a) {
            $("#notescontentframe").contents().find("div#main_header").html(a)
        }
    });
    0 <= ["html", "txt", "md"].indexOf(b) && $.ajax({
        type: "POST",
        url: "plugins/primitivenotes/notes.php",
        data: {
            editNote: "1",
            filename: a
        },
        success: function(a) {
            $("#notescontentframe").contents().find("div#main_area").html(a)
        }
    })
}

function delete_note() {
    var a = window.frames.notescontentframe.document.getElementById("fname").value,
        b = window.frames.notescontentframe.document.getElementById("headerTitle").innerHTML,
        c = rcmail.gettext("note_del_note", "primitivenotes").replace("%note%", b);
    if (a && b)
        if (confirm(c)) $.ajax({
            url: "plugins/primitivenotes/notes.php",
            type: "post",
            data: {
                delNote: "1",
                mode: "delete",
                fileid: a
            },
            success: function(a) {
                document.getElementById("notescontentframe").src = "plugins/primitivenotes/notes.php"
            }
        });
        else return !1
}

function send_note() {
    var a = window.frames.notescontentframe.document.getElementById("fname").value,
        b = a.substring(a.lastIndexOf(".") + 1); - 1 < "html pdf jpg png md txt".split(" ").indexOf(b) ? rcmail.goto_url("mail/compose", {
        _note_type: b,
        _note_filename: a
    }, !0) : alert(rcmail.gettext("note_inv_format", "primitivenotes"))
};