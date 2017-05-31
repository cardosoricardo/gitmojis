//Import St because is the library that allow you to create UI elements
const St = imports.gi.St;

//Import Clutter because is the library that allow you to layout UI elements
const Clutter = imports.gi.Clutter;


//Import Main because is the instance of the class that have all the UI elements
const Main = imports.ui.main;


//Import PanelMenu and PopupMenu 
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;

const Lang = imports.lang;
const Clipboard = St.Clipboard.get_default();
const CLIPBOARD_TYPE = St.ClipboardType.CLIPBOARD;

const EmojiButton = new Lang.Class({
    Name: 'EmojiButton', //Class Name
    Extends: St.Button, //Parent Class

    //Constructor
    _init: function(emojiText, menuBase) {
        this.parent();
        this.connect('clicked', Lang.bind(menuBase, function() {
            Clipboard.set_text(CLIPBOARD_TYPE, emojiText);
        }));

        this.label = emojiText;
        this.style_class = 'emoji';
    },
});

const EmojisMenu = new Lang.Class({
    Name: 'EmojisMenu', //Class Name
    Extends: PanelMenu.Button, //Parent Class

    //Constructor
    _init: function() {

        this.parent(0, 'EmojisMenu', false);
        let box = new St.BoxLayout();

        let toplabel = new St.Label({
            text: '⇄',
            y_expand: true,
            y_align: Clutter.ActorAlign.CENTER
        });

        box.add(toplabel);
        box.add(PopupMenu.arrowIcon(St.Side.BOTTOM));
        this.actor.add_child(box);

        let EmojiCategory = new PopupMenu.PopupSubMenuMenuItem('Git');

        let ListEmojis = ['🎨', '⚡️', '🔥', '🐛', '🚑', '✨', '📝', '🚀', '💄', '🎉', '✅', '🔒', '🍎', '🐧', '🏁', '🔖', '🚨', '🚧', '💚', '⬇️', '⬆️', '👷',
            '📈', '🔨', '➖', '🐳', '➕', '🔧', '🌐', '✏️', '💩', '⏪', '🔀', '📦', '👽', '🚚', '📄', '💥', '🍱', '👌', '♿️', '💡', '🍻', '💬'
        ];

        for (var i = 0; i < ListEmojis.length; i++) {
            let emoji = ListEmojis[i];
            if (i % 6 === 0) {
                item = new PopupMenu.PopupBaseMenuItem('');
                item.actor.track_hover = false;
                container = new St.BoxLayout({ style_class: 'menu-box' });
                item.actor.add(container, { expand: true });
                EmojiCategory.menu.addMenuItem(item);
            }
            let button = new EmojiButton(emoji, this)
            container.add_child(button, { hover: true });
        }

        this.menu.addMenuItem(EmojiCategory);

        this.menu.connect('open-state-changed', Lang.bind(this, function() {
            EmojiCategory.setSubmenuShown(true);
        }));

        EmojiCategory.menu.box.style_class = 'EmojisItemStyle';

    },

    destroy: function() {
        this.parent();
    }
});

let button;

function init() {}

function enable() {
    button = new EmojisMenu;

    Main.panel.addToStatusArea('EmojisMenu', button, 0, 'right');
}

function disable() {
    button.destroy();
}