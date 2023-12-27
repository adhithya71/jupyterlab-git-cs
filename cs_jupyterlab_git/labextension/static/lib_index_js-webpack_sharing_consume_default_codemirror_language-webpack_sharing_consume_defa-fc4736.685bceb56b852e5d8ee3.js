"use strict";
(self["webpackChunk_cs_jupyterlab_git"] = self["webpackChunk_cs_jupyterlab_git"] || []).push([["lib_index_js-webpack_sharing_consume_default_codemirror_language-webpack_sharing_consume_defa-fc4736"],{

/***/ "./lib/cancelledError.js":
/*!*******************************!*\
  !*** ./lib/cancelledError.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CancelledError: () => (/* binding */ CancelledError)
/* harmony export */ });
class CancelledError extends Error {
    constructor(...params) {
        super(...params);
        this.name = 'CancelledError';
    }
}


/***/ }),

/***/ "./lib/cloneCommand.js":
/*!*****************************!*\
  !*** ./lib/cloneCommand.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   gitCloneCommandPlugin: () => (/* binding */ gitCloneCommandPlugin)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/filebrowser */ "webpack/sharing/consume/default/@jupyterlab/filebrowser");
/* harmony import */ var _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _commandsAndMenu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./commandsAndMenu */ "./lib/commandsAndMenu.js");
/* harmony import */ var _style_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./style/icons */ "./lib/style/icons.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tokens */ "./lib/tokens.js");
/* harmony import */ var _widgets_GitCloneForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./widgets/GitCloneForm */ "./lib/widgets/GitCloneForm.js");
/* harmony import */ var _notifications__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./notifications */ "./lib/notifications.js");









const gitCloneCommandPlugin = {
    id: '@jupyterlab/git:clone',
    requires: [_tokens__WEBPACK_IMPORTED_MODULE_4__.IGitExtension, _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_1__.IDefaultFileBrowser, _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.IToolbarWidgetRegistry],
    optional: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ICommandPalette, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__.ITranslator],
    activate: (app, gitModel, fileBrowser, toolbarRegistry, palette, translator) => {
        translator = translator !== null && translator !== void 0 ? translator : _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__.nullTranslator;
        const trans = translator.load('jupyterlab_git');
        const fileBrowserModel = fileBrowser.model;
        /** Add git clone command */
        app.commands.addCommand(_tokens__WEBPACK_IMPORTED_MODULE_4__.CommandIDs.gitClone, {
            label: trans.__('Clone a Repository'),
            caption: trans.__('Clone a repository from a URL'),
            isEnabled: () => gitModel.pathRepository === null,
            execute: async () => {
                var _a;
                const result = await (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                    title: trans.__('Clone a repo'),
                    body: new _widgets_GitCloneForm__WEBPACK_IMPORTED_MODULE_5__.GitCloneForm(trans),
                    focusNodeSelector: 'input',
                    buttons: [
                        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.cancelButton({ label: trans.__('Cancel') }),
                        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({ label: trans.__('Clone') })
                    ]
                });
                if (result.button.accept && ((_a = result.value) === null || _a === void 0 ? void 0 : _a.url)) {
                    const id = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.emit(trans.__('Cloning…'), 'in-progress', {
                        autoClose: false
                    });
                    try {
                        const details = await (0,_commandsAndMenu__WEBPACK_IMPORTED_MODULE_6__.showGitOperationDialog)(gitModel, _commandsAndMenu__WEBPACK_IMPORTED_MODULE_6__.Operation.Clone, trans, {
                            path: app.serviceManager.contents.localPath(fileBrowserModel.path),
                            url: result.value.url,
                            versioning: result.value.versioning,
                            submodules: result.value.submodules
                        });
                        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.update({
                            id,
                            message: trans.__('Successfully cloned'),
                            type: 'success',
                            ...(0,_notifications__WEBPACK_IMPORTED_MODULE_7__.showDetails)(details, trans)
                        });
                        await fileBrowserModel.refresh();
                    }
                    catch (error) {
                        console.error('Encountered an error when cloning the repository. Error: ', error);
                        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.update({
                            id,
                            message: trans.__('Failed to clone'),
                            type: 'error',
                            ...(0,_notifications__WEBPACK_IMPORTED_MODULE_7__.showError)(error, trans)
                        });
                        throw error;
                    }
                }
            }
        });
        // Register a clone button to the file browser extension toolbar
        toolbarRegistry.addFactory('FileBrowser', 'gitClone', () => _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ReactWidget.create(react__WEBPACK_IMPORTED_MODULE_3__.createElement(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.UseSignal, { signal: gitModel.repositoryChanged, initialArgs: {
                name: 'pathRepository',
                oldValue: null,
                newValue: gitModel.pathRepository
            } }, (_, change) => (react__WEBPACK_IMPORTED_MODULE_3__.createElement(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ToolbarButtonComponent, { enabled: (change === null || change === void 0 ? void 0 : change.newValue) === null, icon: _style_icons__WEBPACK_IMPORTED_MODULE_8__.cloneIcon, onClick: () => {
                app.commands.execute(_tokens__WEBPACK_IMPORTED_MODULE_4__.CommandIDs.gitClone);
            }, tooltip: trans.__('Git Clone') })))));
        // Add the context menu items for the default file browser
        (0,_commandsAndMenu__WEBPACK_IMPORTED_MODULE_6__.addFileBrowserContextMenu)(gitModel, fileBrowser, app.serviceManager.contents, app.contextMenu, trans);
        if (palette) {
            // Add the commands to the command palette
            const category = 'Git Operations';
            palette.addItem({ command: _tokens__WEBPACK_IMPORTED_MODULE_4__.CommandIDs.gitClone, category });
        }
    },
    autoStart: true
};


/***/ }),

/***/ "./lib/commandsAndMenu.js":
/*!********************************!*\
  !*** ./lib/commandsAndMenu.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Operation: () => (/* binding */ Operation),
/* harmony export */   addCommands: () => (/* binding */ addCommands),
/* harmony export */   addFileBrowserContextMenu: () => (/* binding */ addFileBrowserContextMenu),
/* harmony export */   addHistoryMenuItems: () => (/* binding */ addHistoryMenuItems),
/* harmony export */   addMenuItems: () => (/* binding */ addMenuItems),
/* harmony export */   createGitMenu: () => (/* binding */ createGitMenu),
/* harmony export */   showGitOperationDialog: () => (/* binding */ showGitOperationDialog)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/codeeditor */ "webpack/sharing/consume/default/@jupyterlab/codeeditor");
/* harmony import */ var _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _cancelledError__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./cancelledError */ "./lib/cancelledError.js");
/* harmony import */ var _components_BranchPicker__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/BranchPicker */ "./lib/components/BranchPicker.js");
/* harmony import */ var _components_FileList__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./components/FileList */ "./lib/components/FileList.js");
/* harmony import */ var _components_ManageRemoteDialogue__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/ManageRemoteDialogue */ "./lib/components/ManageRemoteDialogue.js");
/* harmony import */ var _components_NewTagDialog__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./components/NewTagDialog */ "./lib/components/NewTagDialog.js");
/* harmony import */ var _components_diff_PlainTextDiff__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/diff/PlainTextDiff */ "./lib/components/diff/PlainTextDiff.js");
/* harmony import */ var _components_diff_PreviewMainAreaWidget__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/diff/PreviewMainAreaWidget */ "./lib/components/diff/PreviewMainAreaWidget.js");
/* harmony import */ var _components_diff_model__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./components/diff/model */ "./lib/components/diff/model.js");
/* harmony import */ var _git__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./git */ "./lib/git.js");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./model */ "./lib/model.js");
/* harmony import */ var _notifications__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./notifications */ "./lib/notifications.js");
/* harmony import */ var _style_icons__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./style/icons */ "./lib/style/icons.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./tokens */ "./lib/tokens.js");
/* harmony import */ var _widgets_AdvancedPushForm__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./widgets/AdvancedPushForm */ "./lib/widgets/AdvancedPushForm.js");
/* harmony import */ var _widgets_CredentialsBox__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./widgets/CredentialsBox */ "./lib/widgets/CredentialsBox.js");
/* harmony import */ var _widgets_GitResetToRemoteForm__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./widgets/GitResetToRemoteForm */ "./lib/widgets/GitResetToRemoteForm.js");
/* harmony import */ var _widgets_discardAllChanges__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./widgets/discardAllChanges */ "./lib/widgets/discardAllChanges.js");

























/**
 * Git operations requiring authentication
 */
var Operation;
(function (Operation) {
    Operation["Clone"] = "Clone";
    Operation["Pull"] = "Pull";
    Operation["Push"] = "Push";
    Operation["ForcePush"] = "ForcePush";
    Operation["Fetch"] = "Fetch";
})(Operation || (Operation = {}));
function pluralizedContextLabel(singular, plural) {
    return (args) => {
        const { files } = args;
        if (files.length > 1) {
            return plural;
        }
        else {
            return singular;
        }
    };
}
/**
 * Add the commands for the git extension.
 */
function addCommands(app, gitModel, editorFactory, languageRegistry, fileBrowserModel, settings, translator) {
    const { commands, shell, serviceManager } = app;
    const trans = translator.load('jupyterlab_git');
    /**
     * Commit using a keystroke combination when in CommitBox.
     *
     * This command is not accessible from the user interface (not visible),
     * as it is handled by a signal listener in the CommitBox component instead.
     * The label and caption are given to ensure that the command will
     * show up in the shortcut editor UI with a nice description.
     */
    commands.addCommand(_tokens__WEBPACK_IMPORTED_MODULE_8__.CommandIDs.gitSubmitCommand, {
        label: trans.__('Commit from the Commit Box'),
        caption: trans.__('Submit the commit using the summary and description from commit box'),
        execute: () => void 0,
        isVisible: () => false
    });
    /**
     * Add open terminal in the Git repository
     */
    commands.addCommand(_tokens__WEBPACK_IMPORTED_MODULE_8__.CommandIDs.gitTerminalCommand, {
        label: trans.__('Open Git Repository in Terminal'),
        caption: trans.__('Open a New Terminal to the Git Repository'),
        execute: async (args) => {
            const main = (await commands.execute('terminal:create-new', args));
            try {
                if (gitModel.pathRepository !== null) {
                    const terminal = main.content;
                    terminal.session.send({
                        type: 'stdin',
                        content: [
                            `cd "${gitModel.pathRepository
                                .split('"')
                                .join('\\"')
                                .split('`')
                                .join('\\`')}"\n`
                        ]
                    });
                }
                return main;
            }
            catch (e) {
                console.error(e);
                main.dispose();
            }
        },
        isEnabled: () => gitModel.pathRepository !== null &&
            app.serviceManager.terminals.isAvailable()
    });
    /** Add open/go to git interface command */
    commands.addCommand(_tokens__WEBPACK_IMPORTED_MODULE_8__.CommandIDs.gitUI, {
        label: trans.__('Git Interface'),
        caption: trans.__('Go to Git user interface'),
        execute: () => {
            try {
                shell.activateById('jp-git-sessions');
            }
            catch (err) {
                console.error('Fail to open Git tab.');
            }
        }
    });
    /** Add git init command */
    commands.addCommand(_tokens__WEBPACK_IMPORTED_MODULE_8__.CommandIDs.gitInit, {
        label: trans.__('Initialize a Repository'),
        caption: trans.__('Create an empty Git repository or reinitialize an existing one'),
        execute: async () => {
            const currentPath = app.serviceManager.contents.localPath(fileBrowserModel.path);
            const result = await (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                title: trans.__('Initialize a Repository'),
                body: trans.__('Do you really want to make this directory a Git Repo?'),
                buttons: [
                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.cancelButton({ label: trans.__('Cancel') }),
                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.warnButton({ label: trans.__('Yes') })
                ]
            });
            if (result.button.accept) {
                const id = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.emit(trans.__('Initializing…'), 'in-progress', {
                    autoClose: false
                });
                try {
                    await gitModel.init(currentPath);
                    gitModel.pathRepository = currentPath;
                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.update({
                        id,
                        message: trans.__('Git repository initialized.'),
                        type: 'success',
                        autoClose: 5000
                    });
                }
                catch (error) {
                    console.error(trans.__('Encountered an error when initializing the repository. Error: '), error);
                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.update({
                        id,
                        message: trans.__('Failed to initialize the Git repository'),
                        type: 'error',
                        ...(0,_notifications__WEBPACK_IMPORTED_MODULE_9__.showError)(error, trans)
                    });
                }
            }
        },
        isEnabled: () => gitModel.pathRepository === null
    });
    /** Open URL externally */
    commands.addCommand(_tokens__WEBPACK_IMPORTED_MODULE_8__.CommandIDs.gitOpenUrl, {
        label: args => trans.__(args['text']),
        execute: args => {
            const url = args['url'];
            window.open(url);
        }
    });
    /** add toggle for simple staging */
    commands.addCommand(_tokens__WEBPACK_IMPORTED_MODULE_8__.CommandIDs.gitToggleSimpleStaging, {
        label: trans.__('Simple staging'),
        isToggled: () => !!settings.composite['simpleStaging'],
        execute: args => {
            settings.set('simpleStaging', !settings.composite['simpleStaging']);
        }
    });
    /** add toggle for double click opens diffs */
    commands.addCommand(_tokens__WEBPACK_IMPORTED_MODULE_8__.CommandIDs.gitToggleDoubleClickDiff, {
        label: trans.__('Double click opens diff'),
        isToggled: () => !!settings.composite['doubleClickDiff'],
        execute: args => {
            settings.set('doubleClickDiff', !settings.composite['doubleClickDiff']);
        }
    });
    /** Command to add a remote Git repository */
    commands.addCommand(_tokens__WEBPACK_IMPORTED_MODULE_8__.CommandIDs.gitManageRemote, {
        label: trans.__('Manage Remote Repositories'),
        caption: trans.__('Manage Remote Repositories'),
        isEnabled: () => gitModel.pathRepository !== null,
        execute: () => {
            if (gitModel.pathRepository === null) {
                console.warn(trans.__('Not in a Git repository. Unable to add a remote.'));
                return;
            }
            const widgetId = 'git-dialog-ManageRemote';
            let anchor = document.querySelector(`#${widgetId}`);
            if (!anchor) {
                anchor = document.createElement('div');
                anchor.id = widgetId;
                document.body.appendChild(anchor);
            }
            const dialog = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ReactWidget.create(react__WEBPACK_IMPORTED_MODULE_7__.createElement(_components_ManageRemoteDialogue__WEBPACK_IMPORTED_MODULE_10__.ManageRemoteDialogue, { trans: trans, model: gitModel, onClose: () => dialog.dispose() }));
            _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__.Widget.attach(dialog, anchor);
        }
    });
    async function showGitignore(error) {
        const model = new _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1__.CodeEditor.Model({});
        const repoPath = gitModel.getRelativeFilePath();
        const id = repoPath + '/.git-ignore';
        const contentData = await gitModel.readGitIgnore();
        const gitIgnoreWidget = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.find)(shell.widgets(), shellWidget => shellWidget.id === id);
        if (gitIgnoreWidget) {
            shell.activateById(id);
            return;
        }
        model.sharedModel.setSource(contentData ? contentData : '');
        const editor = new _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1__.CodeEditorWrapper({
            factory: editorFactory.newDocumentEditor.bind(editorFactory),
            model: model
        });
        const modelChangedSignal = model.sharedModel.changed;
        editor.disposed.connect(() => {
            model.dispose();
        });
        const preview = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.MainAreaWidget({
            content: editor
        });
        preview.title.label = '.gitignore';
        preview.id = id;
        preview.title.icon = _style_icons__WEBPACK_IMPORTED_MODULE_11__.gitIcon;
        preview.title.closable = true;
        preview.title.caption = repoPath + '/.gitignore';
        const saveButton = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__.ToolbarButton({
            icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__.saveIcon,
            onClick: async () => {
                if (saved) {
                    return;
                }
                const newContent = model.sharedModel.getSource();
                try {
                    await gitModel.writeGitIgnore(newContent);
                    preview.title.className = '';
                    saved = true;
                }
                catch (error) {
                    console.log('Could not save .gitignore');
                }
            },
            tooltip: trans.__('Saves .gitignore')
        });
        let saved = true;
        preview.toolbar.addItem('save', saveButton);
        shell.add(preview);
        modelChangedSignal.connect(() => {
            if (saved) {
                saved = false;
                preview.title.className = 'not-saved';
            }
        });
    }
    /* Helper: Show gitignore hidden file */
    async function showGitignoreHiddenFile(error, hidePrompt) {
        if (hidePrompt) {
            return showGitignore(error);
        }
        const result = await (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
            title: trans.__('Warning: The .gitignore file is a hidden file.'),
            body: (react__WEBPACK_IMPORTED_MODULE_7__.createElement("div", null,
                trans.__('Hidden files by default cannot be accessed with the regular code editor. In order to open the .gitignore file you must:'),
                react__WEBPACK_IMPORTED_MODULE_7__.createElement("ol", null,
                    react__WEBPACK_IMPORTED_MODULE_7__.createElement("li", null,
                        trans.__('Print the command below to create a jupyter_server_config.py file with defaults commented out. If you already have the file located in .jupyter, skip this step.'),
                        react__WEBPACK_IMPORTED_MODULE_7__.createElement("div", { style: { padding: '0.5rem' } }, 'jupyter server --generate-config')),
                    react__WEBPACK_IMPORTED_MODULE_7__.createElement("li", null,
                        trans.__('Open jupyter_server_config.py, uncomment out the following line and set it to True:'),
                        react__WEBPACK_IMPORTED_MODULE_7__.createElement("div", { style: { padding: '0.5rem' } }, 'c.ContentsManager.allow_hidden = False'))))),
            buttons: [
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.cancelButton({ label: trans.__('Cancel') }),
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({ label: trans.__('Show .gitignore file anyways') })
            ],
            checkbox: {
                label: trans.__('Do not show this warning again'),
                checked: false
            }
        });
        if (result.button.accept) {
            settings.set('hideHiddenFileWarning', result.isChecked);
            showGitignore(error);
        }
    }
    /** Add git open gitignore command */
    commands.addCommand(_tokens__WEBPACK_IMPORTED_MODULE_8__.CommandIDs.gitOpenGitignore, {
        label: trans.__('Open .gitignore'),
        caption: trans.__('Open .gitignore'),
        isEnabled: () => gitModel.pathRepository !== null,
        execute: async () => {
            try {
                await gitModel.ensureGitignore();
            }
            catch (error) {
                if ((error === null || error === void 0 ? void 0 : error.name) === 'hiddenFile') {
                    await showGitignoreHiddenFile(error, settings.composite['hideHiddenFileWarning']);
                }
            }
        }
    });
    /** Add git push command */
    commands.addCommand(_tokens__WEBPACK_IMPORTED_MODULE_8__.CommandIDs.gitPush, {
        label: args => args['advanced']
            ? trans.__('Push to Remote (Advanced)')
            : trans.__('Push to Remote'),
        caption: trans.__('Push code to remote repository'),
        isEnabled: () => gitModel.pathRepository !== null,
        execute: async (args) => {
            let id = null;
            try {
                let remote;
                let force;
                if (args['advanced']) {
                    const result = await (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                        title: trans.__('Please select push options.'),
                        body: new _widgets_AdvancedPushForm__WEBPACK_IMPORTED_MODULE_12__.AdvancedPushForm(trans, gitModel),
                        buttons: [
                            _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.cancelButton({ label: trans.__('Cancel') }),
                            _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({ label: trans.__('Proceed') })
                        ]
                    });
                    if (result.button.accept && result.value) {
                        remote = result.value.remoteName;
                        force = result.value.force;
                    }
                    else {
                        return;
                    }
                }
                id = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.emit(trans.__('Pushing…'), 'in-progress', {
                    autoClose: false
                });
                const details = await showGitOperationDialog(gitModel, force ? Operation.ForcePush : Operation.Push, trans, (args = { remote }));
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.update({
                    id,
                    message: trans.__('Successfully pushed'),
                    type: 'success',
                    ...(0,_notifications__WEBPACK_IMPORTED_MODULE_9__.showDetails)(details, trans)
                });
            }
            catch (error) {
                if (error.name !== 'CancelledError') {
                    console.error(trans.__('Encountered an error when pushing changes. Error: '), error);
                    const message = trans.__('Failed to push');
                    const options = (0,_notifications__WEBPACK_IMPORTED_MODULE_9__.showError)(error, trans);
                    if (id) {
                        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.update({
                            id,
                            message,
                            type: 'error',
                            ...options
                        });
                    }
                    else {
                        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.error(message, options);
                    }
                }
                else {
                    if (id) {
                        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.dismiss(id);
                    }
                }
            }
        }
    });
    /** Add git pull command */
    commands.addCommand(_tokens__WEBPACK_IMPORTED_MODULE_8__.CommandIDs.gitPull, {
        label: args => args.force
            ? trans.__('Pull from Remote (Force)')
            : trans.__('Pull from Remote'),
        caption: args => args.force
            ? trans.__('Discard all current changes and pull from remote repository')
            : trans.__('Pull latest code from remote repository'),
        isEnabled: () => gitModel.pathRepository !== null,
        execute: async (args) => {
            let id = null;
            try {
                if (args.force) {
                    await (0,_widgets_discardAllChanges__WEBPACK_IMPORTED_MODULE_13__.discardAllChanges)(gitModel, trans, args.fallback);
                }
                id = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.emit(trans.__('Pulling…'), 'in-progress', {
                    autoClose: false
                });
                const details = await showGitOperationDialog(gitModel, Operation.Pull, trans);
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.update({
                    id,
                    message: trans.__('Successfully pulled'),
                    type: 'success',
                    ...(0,_notifications__WEBPACK_IMPORTED_MODULE_9__.showDetails)(details, trans)
                });
            }
            catch (error) {
                if (error.name !== 'CancelledError') {
                    console.error('Encountered an error when pulling changes. Error: ', error);
                    const errorMsg = typeof error === 'string' ? error : error.message;
                    // Discard changes then retry pull
                    if (errorMsg
                        .toLowerCase()
                        .includes('your local changes to the following files would be overwritten by merge')) {
                        await commands.execute(_tokens__WEBPACK_IMPORTED_MODULE_8__.CommandIDs.gitPull, {
                            force: true,
                            fallback: true
                        });
                    }
                    else {
                        if (error.cancelled) {
                            if (id) {
                                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.dismiss(id);
                            }
                        }
                        else {
                            const message = trans.__('Failed to pull');
                            const options = (0,_notifications__WEBPACK_IMPORTED_MODULE_9__.showError)(error, trans);
                            if (id) {
                                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.update({
                                    id,
                                    message,
                                    ...options
                                });
                            }
                            else {
                                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.error(message, options);
                            }
                        }
                    }
                }
                else {
                    if (id) {
                        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.dismiss(id);
                    }
                }
            }
        }
    });
    /** Add git reset --hard <remote-tracking-branch> command */
    commands.addCommand(_tokens__WEBPACK_IMPORTED_MODULE_8__.CommandIDs.gitResetToRemote, {
        label: trans.__('Reset to Remote'),
        caption: trans.__('Reset Current Branch to Remote State'),
        isEnabled: () => gitModel.pathRepository !== null,
        execute: async () => {
            var _a, _b;
            const result = await (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                title: trans.__('Reset to Remote'),
                body: new _widgets_GitResetToRemoteForm__WEBPACK_IMPORTED_MODULE_14__.CheckboxForm(trans.__('To bring the current branch to the state of its corresponding remote tracking branch, \
            a hard reset will be performed, which may result in some files being permanently deleted \
            and some changes being permanently discarded. Are you sure you want to proceed? \
            This action cannot be undone.'), trans.__('Close all opened files to avoid conflicts')),
                buttons: [
                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.cancelButton({ label: trans.__('Cancel') }),
                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.warnButton({ label: trans.__('Proceed') })
                ]
            });
            if (result.button.accept) {
                let id = null;
                try {
                    if ((_a = result.value) === null || _a === void 0 ? void 0 : _a.checked) {
                        id = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.emit(trans.__('Closing all opened files...'), 'in-progress');
                        await fileBrowserModel.manager.closeAll();
                    }
                    const message = trans.__('Resetting...');
                    if (id) {
                        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.update({ id, message });
                    }
                    else {
                        id = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.emit(message, 'in-progress', {
                            autoClose: false
                        });
                    }
                    await gitModel.resetToCommit((_b = gitModel.status.remote) !== null && _b !== void 0 ? _b : undefined);
                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.update({
                        id,
                        message: trans.__('Successfully reset'),
                        type: 'success',
                        ...(0,_notifications__WEBPACK_IMPORTED_MODULE_9__.showDetails)(trans.__('Successfully reset the current branch to its remote state'), trans)
                    });
                }
                catch (error) {
                    console.error('Encountered an error when resetting the current branch to its remote state. Error: ', error);
                    const message = trans.__('Reset failed');
                    const options = (0,_notifications__WEBPACK_IMPORTED_MODULE_9__.showError)(error, trans);
                    if (id) {
                        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.update({
                            id,
                            type: 'error',
                            message,
                            ...options
                        });
                    }
                    else {
                        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.error(message, options);
                    }
                }
            }
        }
    });
    /**
     * Git display diff command - internal command
     *
     * @params model: The diff model to display
     * @params isText: Optional, whether the content is a plain text
     * @params isMerge: Optional, whether the diff is a merge conflict
     * @returns the main area widget or null
     */
    commands.addCommand(_tokens__WEBPACK_IMPORTED_MODULE_8__.CommandIDs.gitShowDiff, {
        label: trans.__('Show Diff'),
        caption: trans.__('Display a file diff.'),
        execute: async (args) => {
            var _a, _b;
            const { model, isText, isPreview } = args;
            const fullPath = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PathExt.join((_a = model.repositoryPath) !== null && _a !== void 0 ? _a : '/', model.filename);
            const buildDiffWidget = (_b = (0,_model__WEBPACK_IMPORTED_MODULE_15__.getDiffProvider)(fullPath)) !== null && _b !== void 0 ? _b : (isText &&
                (options => (0,_components_diff_PlainTextDiff__WEBPACK_IMPORTED_MODULE_16__.createPlainTextDiff)({
                    ...options,
                    editorFactory: editorFactory.newInlineEditor.bind(editorFactory),
                    languageRegistry
                })));
            if (buildDiffWidget) {
                const id = `git-diff-${fullPath}-${model.reference.label}-${model.challenger.label}`;
                const mainAreaItems = shell.widgets('main');
                let mainAreaItem = null;
                for (const item of mainAreaItems) {
                    if (item.id === id) {
                        shell.activateById(id);
                        mainAreaItem = item;
                        break;
                    }
                }
                if (!mainAreaItem) {
                    const content = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__.Panel();
                    const modelIsLoading = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_5__.PromiseDelegate();
                    const diffWidget = (mainAreaItem = new _components_diff_PreviewMainAreaWidget__WEBPACK_IMPORTED_MODULE_17__.PreviewMainAreaWidget({
                        content,
                        reveal: modelIsLoading.promise,
                        isPreview
                    }));
                    diffWidget.id = id;
                    diffWidget.title.label = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PathExt.basename(model.filename);
                    diffWidget.title.caption = fullPath;
                    diffWidget.title.icon = _style_icons__WEBPACK_IMPORTED_MODULE_11__.diffIcon;
                    diffWidget.title.closable = true;
                    diffWidget.title.className = 'jp-git-diff-title';
                    diffWidget.addClass('jp-git-diff-parent-widget');
                    shell.add(diffWidget, 'main');
                    shell.activateById(diffWidget.id);
                    // Search for the tab
                    const dockPanel = app.shell._dockPanel;
                    // Get the index of the most recent tab opened
                    let tabPosition = -1;
                    const tabBar = Array.from(dockPanel.tabBars()).find(bar => {
                        tabPosition = bar.titles.indexOf(diffWidget.title);
                        return tabPosition !== -1;
                    });
                    // Pin the preview screen if applicable
                    if (tabBar) {
                        _components_diff_PreviewMainAreaWidget__WEBPACK_IMPORTED_MODULE_17__.PreviewMainAreaWidget.pinWidget(tabPosition, tabBar, diffWidget);
                    }
                    // Create the diff widget
                    try {
                        const widget = await buildDiffWidget({
                            model,
                            toolbar: diffWidget.toolbar,
                            translator
                        });
                        diffWidget.toolbar.addItem('spacer', _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__.Toolbar.createSpacerItem());
                        // Do not allow the user to refresh during merge conflicts
                        if (model.hasConflict) {
                            const resolveButton = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__.ToolbarButton({
                                label: trans.__('Mark as resolved'),
                                onClick: async () => {
                                    var _a;
                                    if (!widget.isFileResolved) {
                                        const result = await (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                                            title: trans.__('Resolve with conflicts'),
                                            body: trans.__('Are you sure you want to mark this file as resolved with merge conflicts?')
                                        });
                                        // Bail early if the user wants to finish resolving conflicts
                                        if (!result.button.accept) {
                                            return;
                                        }
                                    }
                                    try {
                                        await serviceManager.contents.save(fullPath, await widget.getResolvedFile());
                                        await gitModel.add(model.filename);
                                        await gitModel.refresh();
                                    }
                                    catch (reason) {
                                        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.error((_a = reason.message) !== null && _a !== void 0 ? _a : reason);
                                    }
                                    finally {
                                        diffWidget.dispose();
                                    }
                                },
                                tooltip: trans.__('Mark file as resolved'),
                                className: 'jp-git-diff-resolve'
                            });
                            diffWidget.toolbar.addItem('resolve', resolveButton);
                        }
                        else {
                            const refreshButton = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__.ToolbarButton({
                                label: trans.__('Refresh'),
                                onClick: async () => {
                                    await widget.refresh();
                                    refreshButton.hide();
                                },
                                tooltip: trans.__('Refresh diff widget'),
                                className: 'jp-git-diff-refresh'
                            });
                            refreshButton.hide();
                            diffWidget.toolbar.addItem('refresh', refreshButton);
                            const refresh = () => {
                                refreshButton.show();
                            };
                            model.changed.connect(refresh);
                            widget.disposed.connect(() => model.changed.disconnect(refresh));
                        }
                        // Load the diff widget
                        modelIsLoading.resolve();
                        content.addWidget(widget);
                    }
                    catch (reason) {
                        console.error(reason);
                        const msg = `Load Diff Model Error (${reason.message || reason})`;
                        modelIsLoading.reject(msg);
                    }
                    if (model.challenger.source === _tokens__WEBPACK_IMPORTED_MODULE_8__.Git.Diff.SpecialRef.INDEX ||
                        model.challenger.source === _tokens__WEBPACK_IMPORTED_MODULE_8__.Git.Diff.SpecialRef.WORKING ||
                        model.reference.source === _tokens__WEBPACK_IMPORTED_MODULE_8__.Git.Diff.SpecialRef.INDEX ||
                        model.reference.source === _tokens__WEBPACK_IMPORTED_MODULE_8__.Git.Diff.SpecialRef.WORKING) {
                        const maybeClose = (_, status) => {
                            const targetFile = status.files.find(fileStatus => model.filename === fileStatus.from);
                            if (!targetFile || targetFile.status === 'unmodified') {
                                gitModel.statusChanged.disconnect(maybeClose);
                                mainAreaItem.dispose();
                            }
                        };
                        gitModel.statusChanged.connect(maybeClose);
                    }
                }
                return mainAreaItem;
            }
            else {
                await (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)(trans.__('Diff Not Supported'), trans.__('Diff is not supported for %1 files.', _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PathExt.extname(model.filename).toLocaleLowerCase()));
                return null;
            }
        },
        icon: _style_icons__WEBPACK_IMPORTED_MODULE_11__.diffIcon.bindprops({ stylesheet: 'menuItem' })
    });
    commands.addCommand(_tokens__WEBPACK_IMPORTED_MODULE_8__.CommandIDs.gitMerge, {
        label: trans.__('Merge Branch…'),
        caption: trans.__('Merge selected branch in the current branch'),
        execute: async (args) => {
            var _a, _b, _c, _d, _e;
            let { branch } = args !== null && args !== void 0 ? args : {};
            if (!branch) {
                // Prompts user to pick a branch
                const localBranches = gitModel.branches.filter(branch => !branch.is_current_branch && !branch.is_remote_branch);
                const widgetId = 'git-dialog-MergeBranch';
                let anchor = document.querySelector(`#${widgetId}`);
                if (!anchor) {
                    anchor = document.createElement('div');
                    anchor.id = widgetId;
                    document.body.appendChild(anchor);
                }
                const waitForDialog = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_5__.PromiseDelegate();
                const dialog = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ReactWidget.create(react__WEBPACK_IMPORTED_MODULE_7__.createElement(_components_BranchPicker__WEBPACK_IMPORTED_MODULE_18__.BranchPicker, { action: "merge", currentBranch: (_b = (_a = gitModel.currentBranch) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : '', branches: localBranches, onClose: (branch) => {
                        dialog.dispose();
                        waitForDialog.resolve(branch !== null && branch !== void 0 ? branch : null);
                    }, trans: trans }));
                _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__.Widget.attach(dialog, anchor);
                branch = (_c = (await waitForDialog.promise)) !== null && _c !== void 0 ? _c : undefined;
            }
            if (branch) {
                const id = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.emit(trans.__("Merging branch '%1'…", branch), 'in-progress');
                try {
                    await gitModel.merge(branch);
                }
                catch (err) {
                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.update({
                        id,
                        type: 'error',
                        message: trans.__("Failed to merge branch '%1' into '%2'.", branch, (_d = gitModel.currentBranch) === null || _d === void 0 ? void 0 : _d.name),
                        ...(0,_notifications__WEBPACK_IMPORTED_MODULE_9__.showError)(err, trans)
                    });
                    return;
                }
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.update({
                    id,
                    type: 'success',
                    message: trans.__("Branch '%1' merged into '%2'.", branch, (_e = gitModel.currentBranch) === null || _e === void 0 ? void 0 : _e.name)
                });
            }
        },
        isEnabled: () => gitModel.branches.some(branch => !branch.is_current_branch && !branch.is_remote_branch)
    });
    commands.addCommand(_tokens__WEBPACK_IMPORTED_MODULE_8__.CommandIDs.gitRebase, {
        label: trans.__('Rebase branch…'),
        caption: trans.__('Rebase current branch onto the selected branch'),
        execute: async (args) => {
            var _a, _b, _c, _d, _e;
            let { branch } = args !== null && args !== void 0 ? args : {};
            if (!branch) {
                // Prompts user to pick a branch
                const localBranches = gitModel.branches.filter(branch => !branch.is_current_branch && !branch.is_remote_branch);
                const widgetId = 'git-dialog-MergeBranch';
                let anchor = document.querySelector(`#${widgetId}`);
                if (!anchor) {
                    anchor = document.createElement('div');
                    anchor.id = widgetId;
                    document.body.appendChild(anchor);
                }
                const waitForDialog = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_5__.PromiseDelegate();
                const dialog = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ReactWidget.create(react__WEBPACK_IMPORTED_MODULE_7__.createElement(_components_BranchPicker__WEBPACK_IMPORTED_MODULE_18__.BranchPicker, { action: "rebase", currentBranch: (_b = (_a = gitModel.currentBranch) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : '', branches: localBranches, onClose: (branch) => {
                        dialog.dispose();
                        waitForDialog.resolve(branch !== null && branch !== void 0 ? branch : null);
                    }, trans: trans }));
                _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__.Widget.attach(dialog, anchor);
                branch = (_c = (await waitForDialog.promise)) !== null && _c !== void 0 ? _c : undefined;
            }
            if (branch) {
                const id = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.emit(trans.__("Rebasing current branch onto '%1'…", branch), 'in-progress');
                try {
                    await gitModel.rebase(branch);
                }
                catch (err) {
                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.update({
                        id,
                        type: 'error',
                        message: trans.__("Failed to rebase branch '%1' onto '%2'.", (_d = gitModel.currentBranch) === null || _d === void 0 ? void 0 : _d.name, branch),
                        ...(0,_notifications__WEBPACK_IMPORTED_MODULE_9__.showError)(err, trans)
                    });
                    return;
                }
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.update({
                    id,
                    type: 'success',
                    message: trans.__("Branch '%1' rebase onto '%2'.", (_e = gitModel.currentBranch) === null || _e === void 0 ? void 0 : _e.name, branch)
                });
            }
        },
        isEnabled: () => gitModel.branches.some(branch => !branch.is_current_branch && !branch.is_remote_branch)
    });
    commands.addCommand(_tokens__WEBPACK_IMPORTED_MODULE_8__.CommandIDs.gitResolveRebase, {
        label: (args = {}) => {
            switch (args.action) {
                case 'continue':
                    return trans.__('Continue rebase');
                case 'skip':
                    return trans.__('Skip current commit');
                case 'abort':
                    return trans.__('Abort rebase');
                default:
                    return trans.__('Resolve rebase');
            }
        },
        caption: (args = {}) => {
            switch (args.action) {
                case 'continue':
                    return trans.__('Continue the rebase by committing the current state.');
                case 'skip':
                    return trans.__('Skip current commit and continue the rebase.');
                case 'abort':
                    return trans.__('Abort the rebase');
                default:
                    return trans.__('Resolve rebase');
            }
        },
        execute: async (args = {}) => {
            var _a, _b, _c;
            const { action } = args;
            if (['continue', 'abort', 'skip'].includes(action !== null && action !== void 0 ? action : '')) {
                const message = (_a = (action => {
                    switch (action) {
                        case 'continue':
                            return trans.__('Continue the rebase…');
                        case 'skip':
                            return trans.__('Skip current commit…');
                        case 'abort':
                            return trans.__('Abort the rebase…');
                    }
                })(action)) !== null && _a !== void 0 ? _a : '';
                const id = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.emit(message, 'in-progress', {
                    autoClose: false
                });
                try {
                    await gitModel.resolveRebase(action);
                }
                catch (err) {
                    const message = (_b = (action => {
                        switch (action) {
                            case 'continue':
                                return trans.__('Fail to continue rebasing.');
                            case 'skip':
                                return trans.__('Fail to skip current commit when rebasing.');
                            case 'abort':
                                return trans.__('Fail to abort the rebase.');
                        }
                    })(action)) !== null && _b !== void 0 ? _b : '';
                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.update({
                        id,
                        type: 'error',
                        message,
                        ...(0,_notifications__WEBPACK_IMPORTED_MODULE_9__.showError)(err, trans)
                    });
                    return;
                }
                const message_ = (_c = (action => {
                    switch (action) {
                        case 'continue':
                            return trans.__('Commit submitted continuing rebase.');
                        case 'skip':
                            return trans.__('Current commit skipped.');
                        case 'abort':
                            return trans.__('Rebase aborted.');
                    }
                })(action)) !== null && _c !== void 0 ? _c : '';
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.update({
                    id,
                    type: 'success',
                    message: message_,
                    autoClose: 5000
                });
            }
        },
        isEnabled: () => gitModel.status.state === _tokens__WEBPACK_IMPORTED_MODULE_8__.Git.State.REBASING
    });
    commands.addCommand(_tokens__WEBPACK_IMPORTED_MODULE_8__.CommandIDs.gitStash, {
        label: trans.__('Stash Changes'),
        caption: trans.__('Stash all current changes'),
        isEnabled: () => gitModel.pathRepository !== null,
        execute: async (args) => {
            var _a;
            const stashDialog = await _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.InputDialog.getText({
                // Default stash message is the last commit hash and message
                title: trans.__('Do you want to stash your changes? '),
                placeholder: trans.__('Stash message (optional)'),
                okLabel: trans.__('Stash')
            });
            const stashMsg = (_a = stashDialog.value) !== null && _a !== void 0 ? _a : '';
            if (stashDialog.button.accept) {
                const id = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.emit(trans.__('Stashing changes'), 'in-progress', { autoClose: false });
                try {
                    await gitModel.stashChanges(stashMsg);
                    // Success
                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.update({
                        id,
                        message: trans.__('Successfully stashed'),
                        type: 'success',
                        autoClose: 5000
                    });
                }
                catch (error) {
                    console.error('Encountered an error when pulling changes. Error: ', error);
                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.update({
                        id,
                        message: trans.__('Failed to stash'),
                        type: 'error',
                        ...(0,_notifications__WEBPACK_IMPORTED_MODULE_9__.showError)(error, trans)
                    });
                }
            }
        }
    });
    /**
     *  Calls refreshStash
     *
     */
    commands.addCommand(_tokens__WEBPACK_IMPORTED_MODULE_8__.CommandIDs.gitStashList, {
        label: trans.__('Stash List'),
        caption: trans.__('Get all the stashed changes'),
        // Check if we are in a git repository
        isEnabled: () => gitModel.pathRepository !== null,
        execute: async (args) => {
            try {
                await gitModel.refreshStash();
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.info(trans.__('Got the stash list'));
            }
            catch (err) {
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.error(trans.__('Failed to get the stash'), (0,_notifications__WEBPACK_IMPORTED_MODULE_9__.showError)(err, trans));
            }
        }
    });
    /* Context menu commands */
    commands.addCommand(_tokens__WEBPACK_IMPORTED_MODULE_8__.ContextCommandIDs.gitFileOpen, {
        label: trans.__('Open'),
        caption: pluralizedContextLabel(trans.__('Open selected file'), trans.__('Open selected files')),
        execute: async (args) => {
            const { files } = args;
            for (const file of files) {
                const { x, y, to } = file;
                if (x === 'D' || y === 'D') {
                    await (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)(trans.__('Open File Failed'), trans.__('This file has been deleted!'));
                    return;
                }
                try {
                    if (to[to.length - 1] !== '/') {
                        commands.execute('docmanager:open', {
                            path: gitModel.getRelativeFilePath(to)
                        });
                    }
                    else {
                        console.log('Cannot open a folder here');
                    }
                }
                catch (err) {
                    console.error(`Fail to open ${to}.`);
                }
            }
        },
        icon: _style_icons__WEBPACK_IMPORTED_MODULE_11__.openIcon.bindprops({ stylesheet: 'menuItem' })
    });
    commands.addCommand(_tokens__WEBPACK_IMPORTED_MODULE_8__.ContextCommandIDs.openFileFromDiff, {
        label: trans.__('Open File'),
        caption: trans.__('Open file from its diff view'),
        execute: async (_) => {
            const domNode = app.contextMenuHitTest((node) => {
                var _a;
                const nodeId = node.dataset.id;
                return (_a = (nodeId === null || nodeId === void 0 ? void 0 : nodeId.substring(0, 8)) === 'git-diff') !== null && _a !== void 0 ? _a : false;
            });
            if (!domNode) {
                return;
            }
            const matches = Array.from(shell.widgets('main')).filter(widget => widget.id === domNode.dataset.id);
            if (matches.length === 0) {
                return;
            }
            const diffModel = matches[0].content
                .widgets[0].model;
            const filename = diffModel.filename;
            if (diffModel.reference.source === _tokens__WEBPACK_IMPORTED_MODULE_8__.Git.Diff.SpecialRef.INDEX ||
                diffModel.reference.source === _tokens__WEBPACK_IMPORTED_MODULE_8__.Git.Diff.SpecialRef.WORKING ||
                diffModel.challenger.source === _tokens__WEBPACK_IMPORTED_MODULE_8__.Git.Diff.SpecialRef.INDEX ||
                diffModel.challenger.source === _tokens__WEBPACK_IMPORTED_MODULE_8__.Git.Diff.SpecialRef.WORKING) {
                const file = gitModel.status.files.find(fileStatus => fileStatus.from === filename);
                if (file) {
                    commands.execute(_tokens__WEBPACK_IMPORTED_MODULE_8__.ContextCommandIDs.gitFileOpen, {
                        files: [file]
                    });
                }
            }
            else {
                commands.execute('docmanager:open', {
                    path: gitModel.getRelativeFilePath(filename)
                });
            }
        }
    });
    commands.addCommand(_tokens__WEBPACK_IMPORTED_MODULE_8__.ContextCommandIDs.gitFileDiff, {
        label: trans.__('Diff'),
        caption: pluralizedContextLabel(trans.__('Diff selected file'), trans.__('Diff selected files')),
        execute: async (args) => {
            const { files } = args;
            if (gitModel.pathRepository === null) {
                return;
            }
            for (const file of files) {
                const { context, filePath, previousFilePath, isText, status, isPreview } = file;
                // nothing to compare to for untracked files
                if (status === 'untracked') {
                    continue;
                }
                const repositoryPath = gitModel.pathRepository;
                const filename = filePath;
                const fullPath = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PathExt.join(repositoryPath, filename);
                const diffContext = {
                    currentRef: '',
                    previousRef: 'HEAD',
                    ...context
                };
                if (status === 'unmerged') {
                    diffContext.baseRef = _tokens__WEBPACK_IMPORTED_MODULE_8__.Git.Diff.SpecialRef.BASE;
                    diffContext.currentRef =
                        gitModel.status.state !== _tokens__WEBPACK_IMPORTED_MODULE_8__.Git.State.MERGING
                            ? gitModel.status.state === _tokens__WEBPACK_IMPORTED_MODULE_8__.Git.State.REBASING
                                ? 'REBASE_HEAD'
                                : 'CHERRY_PICK_HEAD'
                            : 'MERGE_HEAD';
                }
                else if (!diffContext.currentRef) {
                    diffContext.currentRef =
                        status === 'staged'
                            ? _tokens__WEBPACK_IMPORTED_MODULE_8__.Git.Diff.SpecialRef.INDEX
                            : _tokens__WEBPACK_IMPORTED_MODULE_8__.Git.Diff.SpecialRef.WORKING;
                }
                const challengerRef = _tokens__WEBPACK_IMPORTED_MODULE_8__.Git.Diff.SpecialRef[diffContext.currentRef]
                    ? { special: _tokens__WEBPACK_IMPORTED_MODULE_8__.Git.Diff.SpecialRef[diffContext.currentRef] }
                    : { git: diffContext.currentRef };
                // Base props used for Diff Model
                const props = {
                    challenger: {
                        content: async () => {
                            return (0,_git__WEBPACK_IMPORTED_MODULE_19__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.URLExt.join(repositoryPath, 'content'), 'POST', {
                                filename,
                                // @ts-expect-error this is serializable
                                reference: challengerRef
                            }).then(data => data.content);
                        },
                        label: _tokens__WEBPACK_IMPORTED_MODULE_8__.Git.Diff.SpecialRef[diffContext.currentRef] ||
                            diffContext.currentRef,
                        source: diffContext.currentRef,
                        updateAt: Date.now()
                    },
                    filename,
                    reference: {
                        content: async () => {
                            return (0,_git__WEBPACK_IMPORTED_MODULE_19__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.URLExt.join(repositoryPath, 'content'), 'POST', {
                                filename: previousFilePath !== null && previousFilePath !== void 0 ? previousFilePath : filename,
                                reference: { git: diffContext.previousRef }
                            }).then(data => data.content);
                        },
                        label: _tokens__WEBPACK_IMPORTED_MODULE_8__.Git.Diff.SpecialRef[diffContext.previousRef] ||
                            diffContext.previousRef,
                        source: diffContext.previousRef,
                        updateAt: Date.now()
                    },
                    repositoryPath
                };
                // Case when file is relocated
                if (previousFilePath) {
                    props.reference.label = `${previousFilePath} (${props.reference.label.slice(0, 7)})`;
                    props.challenger.label = `${filePath} (${props.challenger.label.slice(0, 7)})`;
                }
                if (diffContext.baseRef) {
                    props.reference.label = trans.__('Current');
                    props.challenger.label = trans.__('Incoming');
                    // Only add base when diff-ing merge conflicts
                    props.base = {
                        content: async () => {
                            return (0,_git__WEBPACK_IMPORTED_MODULE_19__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.URLExt.join(repositoryPath, 'content'), 'POST', {
                                filename,
                                reference: {
                                    special: _tokens__WEBPACK_IMPORTED_MODULE_8__.Git.Diff.SpecialRef[diffContext.baseRef]
                                }
                            }).then(data => data.content);
                        },
                        label: trans.__('Result'),
                        source: diffContext.baseRef,
                        updateAt: Date.now()
                    };
                }
                // Create the diff widget
                const model = new _components_diff_model__WEBPACK_IMPORTED_MODULE_20__.DiffModel(props);
                const widget = await commands.execute(_tokens__WEBPACK_IMPORTED_MODULE_8__.CommandIDs.gitShowDiff, {
                    model,
                    isText,
                    isPreview
                });
                if (widget) {
                    // Trigger diff model update
                    if (diffContext.previousRef === 'HEAD') {
                        const updateHead = () => {
                            model.reference = {
                                ...model.reference,
                                updateAt: Date.now()
                            };
                        };
                        gitModel.headChanged.connect(updateHead);
                        widget.disposed.connect(() => {
                            gitModel.headChanged.disconnect(updateHead);
                        });
                    }
                    // If the diff is on the current file and it is updated => diff model changed
                    if (diffContext.currentRef === _tokens__WEBPACK_IMPORTED_MODULE_8__.Git.Diff.SpecialRef.WORKING) {
                        const updateCurrent = (m, change) => {
                            var _a, _b, _c, _d;
                            const updateAt = new Date((_b = (_a = change.newValue) === null || _a === void 0 ? void 0 : _a.last_modified) !== null && _b !== void 0 ? _b : 0).valueOf();
                            if (app.serviceManager.contents.localPath((_d = (_c = change.newValue) === null || _c === void 0 ? void 0 : _c.path) !== null && _d !== void 0 ? _d : '') === fullPath &&
                                model.challenger.updateAt !== updateAt) {
                                model.challenger = {
                                    ...model.challenger,
                                    updateAt
                                };
                            }
                        };
                        // More robust than fileBrowser.model.fileChanged
                        app.serviceManager.contents.fileChanged.connect(updateCurrent);
                        widget.disposed.connect(() => {
                            app.serviceManager.contents.fileChanged.disconnect(updateCurrent);
                        });
                    }
                }
            }
        },
        icon: _style_icons__WEBPACK_IMPORTED_MODULE_11__.diffIcon.bindprops({ stylesheet: 'menuItem' })
    });
    commands.addCommand(_tokens__WEBPACK_IMPORTED_MODULE_8__.ContextCommandIDs.gitFileAdd, {
        label: trans.__('Add'),
        caption: pluralizedContextLabel(trans.__('Stage or track the changes to selected file'), trans.__('Stage or track the changes of selected files')),
        execute: async (args) => {
            const { files } = args;
            for (const file of files) {
                await gitModel.add(file.to);
            }
        },
        icon: _style_icons__WEBPACK_IMPORTED_MODULE_11__.addIcon.bindprops({ stylesheet: 'menuItem' })
    });
    commands.addCommand(_tokens__WEBPACK_IMPORTED_MODULE_8__.ContextCommandIDs.gitFileStage, {
        label: trans.__('Stage'),
        caption: pluralizedContextLabel(trans.__('Stage the changes of selected file'), trans.__('Stage the changes of selected files')),
        execute: async (args) => {
            const { files } = args;
            for (const file of files) {
                await gitModel.add(file.to);
            }
        },
        icon: _style_icons__WEBPACK_IMPORTED_MODULE_11__.addIcon.bindprops({ stylesheet: 'menuItem' })
    });
    commands.addCommand(_tokens__WEBPACK_IMPORTED_MODULE_8__.ContextCommandIDs.gitFileTrack, {
        label: trans.__('Track'),
        caption: pluralizedContextLabel(trans.__('Start tracking selected file'), trans.__('Start tracking selected files')),
        execute: async (args) => {
            const { files } = args;
            for (const file of files) {
                await gitModel.add(file.to);
            }
        },
        icon: _style_icons__WEBPACK_IMPORTED_MODULE_11__.addIcon.bindprops({ stylesheet: 'menuItem' })
    });
    commands.addCommand(_tokens__WEBPACK_IMPORTED_MODULE_8__.ContextCommandIDs.gitFileUnstage, {
        label: trans.__('Unstage'),
        caption: pluralizedContextLabel(trans.__('Unstage the changes of selected file'), trans.__('Unstage the changes of selected files')),
        execute: async (args) => {
            const { files } = args;
            for (const file of files) {
                if (file.x !== 'D') {
                    await gitModel.reset(file.to);
                }
            }
        },
        icon: _style_icons__WEBPACK_IMPORTED_MODULE_11__.removeIcon.bindprops({ stylesheet: 'menuItem' })
    });
    function representFiles(files) {
        const elements = files.map(file => (react__WEBPACK_IMPORTED_MODULE_7__.createElement("li", { key: file.to },
            react__WEBPACK_IMPORTED_MODULE_7__.createElement("b", null, file.to))));
        return react__WEBPACK_IMPORTED_MODULE_7__.createElement("ul", null, elements);
    }
    commands.addCommand(_tokens__WEBPACK_IMPORTED_MODULE_8__.ContextCommandIDs.gitFileDelete, {
        label: trans.__('Delete'),
        caption: pluralizedContextLabel(trans.__('Delete this file'), trans.__('Delete these files')),
        execute: async (args) => {
            const { files } = args;
            const fileList = representFiles(files);
            const result = await (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                title: trans.__('Delete Files'),
                body: (react__WEBPACK_IMPORTED_MODULE_7__.createElement("span", null,
                    trans.__('Are you sure you want to permanently delete the following files? \
              This action cannot be undone.'),
                    fileList)),
                buttons: [
                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.cancelButton({ label: trans.__('Cancel') }),
                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.warnButton({ label: trans.__('Delete') })
                ]
            });
            if (result.button.accept) {
                for (const file of files) {
                    try {
                        await app.commands.execute('docmanager:delete-file', {
                            path: gitModel.getRelativeFilePath(file.to)
                        });
                    }
                    catch (reason) {
                        (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)(trans.__('Deleting %1 failed.', file.to), reason, [
                            _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.warnButton({ label: trans.__('Dismiss') })
                        ]);
                    }
                }
            }
        },
        icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__.closeIcon.bindprops({ stylesheet: 'menuItem' })
    });
    commands.addCommand(_tokens__WEBPACK_IMPORTED_MODULE_8__.ContextCommandIDs.gitFileDiscard, {
        label: trans.__('Discard'),
        caption: pluralizedContextLabel(trans.__('Discard recent changes of selected file'), trans.__('Discard recent changes of selected files')),
        execute: async (args) => {
            const { files } = args;
            const fileList = representFiles(files);
            const result = await (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                title: trans.__('Discard changes'),
                body: (react__WEBPACK_IMPORTED_MODULE_7__.createElement("span", null,
                    trans.__('Are you sure you want to permanently discard changes to the following files? \
              This action cannot be undone.'),
                    fileList)),
                buttons: [
                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.cancelButton({ label: trans.__('Cancel') }),
                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.warnButton({ label: trans.__('Discard') })
                ]
            });
            if (result.button.accept) {
                for (const file of files) {
                    try {
                        if (file.status === 'staged' ||
                            file.status === 'partially-staged') {
                            await gitModel.reset(file.to);
                        }
                        if (file.status === 'unstaged' ||
                            (file.status === 'partially-staged' && file.x !== 'A')) {
                            // resetting an added file moves it to untracked category => checkout will fail
                            await gitModel.checkout({ filename: file.to });
                        }
                    }
                    catch (reason) {
                        (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)(trans.__('Discard changes for %1 failed.', file.to), reason, [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.warnButton({ label: trans.__('Dismiss') })]);
                    }
                }
            }
        },
        icon: _style_icons__WEBPACK_IMPORTED_MODULE_11__.discardIcon.bindprops({ stylesheet: 'menuItem' })
    });
    commands.addCommand(_tokens__WEBPACK_IMPORTED_MODULE_8__.ContextCommandIDs.gitIgnore, {
        label: pluralizedContextLabel(trans.__('Ignore this file (add to .gitignore)'), trans.__('Ignore these files (add to .gitignore)')),
        caption: pluralizedContextLabel(trans.__('Ignore this file (add to .gitignore)'), trans.__('Ignore these files (add to .gitignore)')),
        execute: async (args) => {
            const { files } = args;
            for (const file of files) {
                if (file) {
                    try {
                        await gitModel.ignore(file.to, false);
                    }
                    catch (error) {
                        if ((error === null || error === void 0 ? void 0 : error.name) === 'hiddenFile') {
                            await showGitignoreHiddenFile(error, settings.composite['hideHiddenFileWarning']);
                        }
                    }
                }
            }
        }
    });
    commands.addCommand(_tokens__WEBPACK_IMPORTED_MODULE_8__.ContextCommandIDs.gitIgnoreExtension, {
        label: args => {
            const { files } = args;
            const extensions = files
                .map(file => _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PathExt.extname(file.to))
                .filter(extension => extension.length > 0)
                .filter((item, index, arr) => arr.indexOf(item) === index);
            return trans._n('Ignore %2 extension (add to .gitignore)', 'Ignore %2 extensions (add to .gitignore)', extensions.length, extensions.join(', '));
        },
        caption: pluralizedContextLabel(trans.__('Ignore this file extension (add to .gitignore)'), trans.__('Ignore these files extension (add to .gitignore)')),
        execute: async (args) => {
            const { files } = args;
            for (const selectedFile of files) {
                if (selectedFile) {
                    const extension = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PathExt.extname(selectedFile.to);
                    if (extension.length > 0) {
                        const result = await (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                            title: trans.__('Ignore file extension'),
                            body: trans.__('Are you sure you want to ignore all %1 files within this git repository?', extension),
                            buttons: [
                                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.cancelButton(),
                                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({ label: trans.__('Ignore') })
                            ]
                        });
                        if (result.button.label === trans.__('Ignore')) {
                            await gitModel.ignore(selectedFile.to, true);
                        }
                    }
                }
            }
        },
        isVisible: args => {
            const { files } = args;
            return files.some(selectedFile => {
                const extension = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PathExt.extname(selectedFile.to);
                return extension.length > 0;
            });
        }
    });
    commands.addCommand(_tokens__WEBPACK_IMPORTED_MODULE_8__.ContextCommandIDs.gitFileHistory, {
        label: trans.__('History'),
        caption: trans.__('View the history of this file'),
        execute: args => {
            const { files } = args;
            const file = files[0];
            if (!file) {
                return;
            }
            gitModel.selectedHistoryFile = file;
            shell.activateById('jp-git-sessions');
        },
        isEnabled: args => {
            const { files } = args;
            return files.length === 1;
        },
        icon: _style_icons__WEBPACK_IMPORTED_MODULE_11__.historyIcon.bindprops({ stylesheet: 'menuItem' })
    });
    commands.addCommand(_tokens__WEBPACK_IMPORTED_MODULE_8__.ContextCommandIDs.gitNoAction, {
        label: trans.__('No actions available'),
        isEnabled: () => false,
        execute: () => void 0
    });
    commands.addCommand(_tokens__WEBPACK_IMPORTED_MODULE_8__.ContextCommandIDs.gitTagAdd, {
        label: trans.__('Add Tag'),
        caption: trans.__('Add tag pointing to selected commit'),
        execute: async (args) => {
            const commit = args;
            const widgetId = 'git-dialog-AddTag';
            let anchor = document.querySelector(`#${widgetId}`);
            if (!anchor) {
                anchor = document.createElement('div');
                anchor.id = widgetId;
                document.body.appendChild(anchor);
            }
            const tagDialog = true;
            const isSingleCommit = true;
            const waitForDialog = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_5__.PromiseDelegate();
            const dialog = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ReactWidget.create(react__WEBPACK_IMPORTED_MODULE_7__.createElement(_components_NewTagDialog__WEBPACK_IMPORTED_MODULE_21__.NewTagDialogBox, { pastCommits: [commit.commit], model: gitModel, trans: trans, open: tagDialog, onClose: (tagName) => {
                    dialog.dispose();
                    waitForDialog.resolve(tagName !== null && tagName !== void 0 ? tagName : null);
                }, isSingleCommit: isSingleCommit }));
            _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__.Widget.attach(dialog, anchor);
            const tagName = await waitForDialog.promise;
            if (tagName) {
                const id = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.emit(trans.__("Create tag pointing to '%1'...", commit.commit.commit_msg), 'in-progress');
                try {
                    await gitModel.setTag(tagName, commit.commit.commit);
                }
                catch (err) {
                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.update({
                        id,
                        message: trans.__("Failed to create tag '%1' poining to '%2'.", tagName, commit),
                        type: 'error',
                        ...(0,_notifications__WEBPACK_IMPORTED_MODULE_9__.showError)(err, trans)
                    });
                    return;
                }
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.update({
                    id,
                    message: trans.__("Created tag '%1' pointing to '%2'.", tagName, commit),
                    type: 'success'
                });
            }
        },
        icon: _style_icons__WEBPACK_IMPORTED_MODULE_11__.tagIcon.bindprops({ stylesheet: 'menuItem' })
    });
}
/**
 * Adds commands and menu items.
 *
 * @param commands - Jupyter App commands registry
 *  @param trans - language translator
 * @returns menu
 */
function createGitMenu(commands, trans) {
    const RESOURCES = [
        {
            text: trans.__('Set Up Remotes'),
            url: 'https://www.atlassian.com/git/tutorials/setting-up-a-repository'
        },
        {
            text: trans.__('Git Documentation'),
            url: 'https://git-scm.com/doc'
        }
    ];
    const menu = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__.Menu({ commands });
    menu.title.label = trans.__('Git');
    [
        _tokens__WEBPACK_IMPORTED_MODULE_8__.CommandIDs.gitInit,
        _tokens__WEBPACK_IMPORTED_MODULE_8__.CommandIDs.gitClone,
        _tokens__WEBPACK_IMPORTED_MODULE_8__.CommandIDs.gitMerge,
        _tokens__WEBPACK_IMPORTED_MODULE_8__.CommandIDs.gitPush,
        _tokens__WEBPACK_IMPORTED_MODULE_8__.CommandIDs.gitPull,
        _tokens__WEBPACK_IMPORTED_MODULE_8__.CommandIDs.gitResetToRemote,
        _tokens__WEBPACK_IMPORTED_MODULE_8__.CommandIDs.gitManageRemote,
        _tokens__WEBPACK_IMPORTED_MODULE_8__.CommandIDs.gitTerminalCommand,
        _tokens__WEBPACK_IMPORTED_MODULE_8__.CommandIDs.gitStash
    ].forEach(command => {
        menu.addItem({ command });
        if (command === _tokens__WEBPACK_IMPORTED_MODULE_8__.CommandIDs.gitPush) {
            menu.addItem({ command, args: { advanced: true } });
        }
        if (command === _tokens__WEBPACK_IMPORTED_MODULE_8__.CommandIDs.gitPull) {
            menu.addItem({ command, args: { force: true } });
        }
    });
    menu.addItem({ type: 'separator' });
    menu.addItem({ command: _tokens__WEBPACK_IMPORTED_MODULE_8__.CommandIDs.gitToggleSimpleStaging });
    menu.addItem({ command: _tokens__WEBPACK_IMPORTED_MODULE_8__.CommandIDs.gitToggleDoubleClickDiff });
    menu.addItem({ type: 'separator' });
    menu.addItem({ command: _tokens__WEBPACK_IMPORTED_MODULE_8__.CommandIDs.gitOpenGitignore });
    menu.addItem({ type: 'separator' });
    const tutorial = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__.Menu({ commands });
    tutorial.title.label = trans.__(' Help ');
    RESOURCES.map(args => {
        tutorial.addItem({
            args,
            command: _tokens__WEBPACK_IMPORTED_MODULE_8__.CommandIDs.gitOpenUrl
        });
    });
    menu.addItem({ type: 'submenu', submenu: tutorial });
    return menu;
}
function addMenuItems(commands, contextMenu, selectedFiles) {
    commands.forEach(command => {
        if (command === _tokens__WEBPACK_IMPORTED_MODULE_8__.ContextCommandIDs.gitFileDiff) {
            contextMenu.addItem({
                command,
                args: {
                    files: selectedFiles.map(file => {
                        return {
                            filePath: file.to,
                            isText: !file.is_binary,
                            status: file.status
                        };
                    })
                }
            });
        }
        else {
            contextMenu.addItem({
                command,
                args: {
                    files: selectedFiles
                }
            });
        }
    });
}
function addHistoryMenuItems(commands, contextMenu, selectedCommit) {
    commands.forEach(command => {
        contextMenu.addItem({
            command,
            args: {
                commit: selectedCommit
            }
        });
    });
}
/**
 * Populate Git context submenu depending on the selected files.
 */
function addFileBrowserContextMenu(model, filebrowser, contents, contextMenu, trans) {
    let gitMenu = null;
    let _commands;
    let _paths;
    function updateItems(menu) {
        const wasShown = menu.isVisible;
        const parent = menu.parentMenu;
        const items = Array.from(filebrowser.selectedItems());
        const statuses = new Set(
        // @ts-expect-error file cannot be undefined or null
        items
            .map(item => {
            var _a;
            const itemPath = contents.localPath(item.path);
            return model.pathRepository === null
                ? undefined
                : (_a = model.getFile(itemPath)) === null || _a === void 0 ? void 0 : _a.status;
        })
            .filter(status => typeof status !== 'undefined'));
        // get commands and de-duplicate them
        const allCommands = new Set(
        // flatten the list of lists of commands
        []
            // @ts-expect-error status can index the context commands object
            .concat(...[...statuses].map(status => _components_FileList__WEBPACK_IMPORTED_MODULE_22__.CONTEXT_COMMANDS[status]))
            // filter out the Open and Delete commands as
            // those are not needed in file browser
            .filter(command => command !== _tokens__WEBPACK_IMPORTED_MODULE_8__.ContextCommandIDs.gitFileOpen &&
            command !== _tokens__WEBPACK_IMPORTED_MODULE_8__.ContextCommandIDs.gitFileDelete &&
            typeof command !== 'undefined')
            // replace stage and track with a single "add" operation
            .map(command => command === _tokens__WEBPACK_IMPORTED_MODULE_8__.ContextCommandIDs.gitFileStage ||
            command === _tokens__WEBPACK_IMPORTED_MODULE_8__.ContextCommandIDs.gitFileTrack
            ? _tokens__WEBPACK_IMPORTED_MODULE_8__.ContextCommandIDs.gitFileAdd
            : command));
        const commandsChanged = !_commands ||
            _commands.length !== allCommands.size ||
            !_commands.every(command => allCommands.has(command));
        const paths = items.map(item => item.path);
        const filesChanged = !_paths || !_lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.ArrayExt.shallowEqual(_paths, paths);
        if (commandsChanged || filesChanged) {
            const commandsList = [...allCommands];
            menu.clearItems();
            addMenuItems(commandsList, menu, 
            // @ts-expect-error file cannot be undefined or null
            (paths !== null && paths !== void 0 ? paths : [])
                .map(path => model.getFile(path))
                // if file cannot be resolved (has no action available),
                // omit the undefined result
                .filter(file => !['null', 'undefined'].includes(typeof file)));
            if (wasShown) {
                // show the menu again after downtime for refresh
                parent.triggerActiveItem();
            }
            _commands = commandsList;
            _paths = paths;
        }
    }
    function updateGitMenu(contextMenu) {
        var _a, _b;
        if (!gitMenu) {
            gitMenu =
                (_b = (_a = contextMenu.menu.items.find(item => { var _a; return item.type === 'submenu' && ((_a = item.submenu) === null || _a === void 0 ? void 0 : _a.id) === 'jp-contextmenu-git'; })) === null || _a === void 0 ? void 0 : _a.submenu) !== null && _b !== void 0 ? _b : null;
        }
        if (!gitMenu) {
            return; // Bail early if the open with menu is not displayed
        }
        // Render using the most recent model (even if possibly outdated)
        updateItems(gitMenu);
        const renderedStatus = model.status;
        // Trigger refresh before the menu is displayed
        model
            .refreshStatus()
            .then(() => {
            if (model.status !== renderedStatus) {
                // update items if needed
                updateItems(gitMenu);
            }
        })
            .catch(error => {
            console.error('Fail to refresh model when displaying git context menu.', error);
        });
    }
    // as any is to support JLab 3.1 feature
    if (contextMenu.opened) {
        contextMenu.opened.connect(updateGitMenu);
    }
    else {
        // matches only non-directory items
        class GitMenu extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__.Menu {
            onBeforeAttach(msg) {
                updateGitMenu(contextMenu);
                super.onBeforeAttach(msg);
            }
        }
        const selectorNotDir = '.jp-DirListing-item[data-isdir="false"]';
        gitMenu = new GitMenu({ commands: contextMenu.menu.commands });
        gitMenu.title.label = trans.__('Git');
        gitMenu.title.icon = _style_icons__WEBPACK_IMPORTED_MODULE_11__.gitIcon.bindprops({ stylesheet: 'menuItem' });
        contextMenu.addItem({
            type: 'submenu',
            submenu: gitMenu,
            selector: selectorNotDir,
            rank: 5
        });
    }
}
/**
 * Handle Git operation that may require authentication.
 *
 * @private
 * @param model - Git extension model
 * @param operation - Git operation name
 * @param trans - language translator
 * @param args - Git operation arguments
 * @param authentication - Git authentication information
 * @param retry - Is this operation retried?
 * @returns Promise for displaying a dialog
 */
async function showGitOperationDialog(model, operation, trans, args, authentication, retry = false) {
    var _a, _b, _c;
    /**
     * Returns the current remote's URL based on the current remote name and all the remotes
     */
    async function getCurrentRemote(currentRemoteName) {
        const remoteList = await model.getRemotes().then(remoteList => {
            return remoteList;
        });
        const currentRemote = remoteList.find(remoteURI => remoteURI.name === currentRemoteName);
        if (currentRemote) {
            return currentRemote === null || currentRemote === void 0 ? void 0 : currentRemote.url;
        }
        else {
            return '';
        }
    }
    /**
     * Returns the Git provider based on the domain name of the url
     */
    function getGitProviderHost(remoteUrl) {
        var _a;
        // Regex returns the word between "https" and "."
        const re = /https:\/\/([^.]+)\./;
        const result = (_a = remoteUrl.match(re)) !== null && _a !== void 0 ? _a : [];
        const gitProvider = result[1];
        return gitProvider;
    }
    try {
        let result;
        // the Git action
        switch (operation) {
            case Operation.Clone:
                // eslint-disable-next-line no-case-declarations
                const { path, url, versioning, submodules } = args;
                result = await model.clone(path, url, authentication, versioning !== null && versioning !== void 0 ? versioning : true, submodules !== null && submodules !== void 0 ? submodules : false);
                break;
            case Operation.Pull:
                result = await model.pull(authentication);
                break;
            case Operation.Push:
                result = await model.push(authentication, false, args['remote']);
                break;
            case Operation.ForcePush:
                result = await model.push(authentication, true, args['remote']);
                break;
            case Operation.Fetch:
                result = await model.fetch(authentication);
                model.credentialsRequired = false;
                break;
            default:
                result = { code: -1, message: 'Unknown git command' };
                break;
        }
        return result.message;
    }
    catch (error) {
        if (_git__WEBPACK_IMPORTED_MODULE_19__.AUTH_ERROR_MESSAGES.some(errorMessage => error.message.indexOf(errorMessage) > -1)) {
            // Change the placeholder message for GitHub
            let gitPasswordPlaceholder = trans.__('password / personal access token');
            let remoteGitProvider = '';
            switch (operation) {
                case Operation.Clone:
                    // eslint-disable-next-line no-case-declarations
                    const { url: encodedArgsUrl } = args;
                    remoteGitProvider = getGitProviderHost(decodeURIComponent(encodedArgsUrl));
                    break;
                case Operation.Push:
                case Operation.ForcePush:
                case Operation.Pull:
                    // If the remote is defined, check it against the remote URI list
                    if ((_a = model.currentBranch) === null || _a === void 0 ? void 0 : _a.upstream) {
                        // Compare the remote against the URI list
                        const remoteName = model.currentBranch.upstream.split('/')[0];
                        const currentRemoteUrl = await getCurrentRemote(remoteName);
                        remoteGitProvider = currentRemoteUrl
                            ? getGitProviderHost(currentRemoteUrl)
                            : '';
                    }
                    else {
                        // if the remote is undefined, use first remote URI
                        const remoteList = await model.getRemotes().then(remoteList => {
                            return remoteList;
                        });
                        remoteGitProvider = getGitProviderHost((_b = remoteList[0]) === null || _b === void 0 ? void 0 : _b.url);
                    }
                    break;
                case Operation.Fetch:
                    remoteGitProvider = await model
                        .getRemotes()
                        .then(remoteList => { var _a; return (_a = remoteList[0]) === null || _a === void 0 ? void 0 : _a.url; });
                    break;
                default:
                    break;
            }
            // GitHub only verifies with personal access tokens
            if (remoteGitProvider && remoteGitProvider.toLowerCase() === 'github') {
                gitPasswordPlaceholder = trans.__('personal access token');
            }
            // If the error is an authentication error, ask the user credentials
            const credentials = await (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                title: trans.__('Git credentials required'),
                body: new _widgets_CredentialsBox__WEBPACK_IMPORTED_MODULE_23__.GitCredentialsForm(trans, trans.__('Enter credentials for remote repository'), retry ? trans.__('Incorrect username or password.') : '', gitPasswordPlaceholder)
            });
            if (credentials.button.accept) {
                // Retry the operation if the user provides its credentials
                return await showGitOperationDialog(model, operation, trans, args, (_c = credentials.value) !== null && _c !== void 0 ? _c : undefined, true);
            }
            else {
                throw new _cancelledError__WEBPACK_IMPORTED_MODULE_24__.CancelledError();
            }
        }
        // Throw the error if it cannot be handled or
        // if the user did not accept to provide its credentials
        throw error;
    }
}


/***/ }),

/***/ "./lib/components/ActionButton.js":
/*!****************************************!*\
  !*** ./lib/components/ActionButton.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ActionButton: () => (/* binding */ ActionButton)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../style/ActionButtonStyle */ "./lib/style/ActionButtonStyle.js");



/**
 * Action button component
 *
 * @param props Component properties
 */
const ActionButton = (props) => {
    const { disabled, className, title, onClick, icon } = props;
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { disabled: disabled, className: (0,typestyle__WEBPACK_IMPORTED_MODULE_1__.classes)(_style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_2__.actionButtonStyle, className), title: title, onClick: onClick },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement(icon.react, { elementPosition: "center", tag: "span" })));
};


/***/ }),

/***/ "./lib/components/BranchMenu.js":
/*!**************************************!*\
  !*** ./lib/components/BranchMenu.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BranchMenu: () => (/* binding */ BranchMenu)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_List__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material/List */ "./node_modules/@mui/material/List/List.js");
/* harmony import */ var _mui_material_ListItem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material/ListItem */ "./node_modules/@mui/material/ListItem/ListItem.js");
/* harmony import */ var _mui_icons_material_Clear__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mui/icons-material/Clear */ "./node_modules/@mui/icons-material/Clear.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_window__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-window */ "webpack/sharing/consume/default/react-window/react-window");
/* harmony import */ var react_window__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_window__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../style/ActionButtonStyle */ "./lib/style/ActionButtonStyle.js");
/* harmony import */ var _style_BranchMenu__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../style/BranchMenu */ "./lib/style/BranchMenu.js");
/* harmony import */ var _style_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../style/icons */ "./lib/style/icons.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../tokens */ "./lib/tokens.js");
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ActionButton */ "./lib/components/ActionButton.js");
/* harmony import */ var _NewBranchDialog__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./NewBranchDialog */ "./lib/components/NewBranchDialog.js");
/* harmony import */ var _notifications__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../notifications */ "./lib/notifications.js");














const ITEM_HEIGHT = 24.8; // HTML element height for a single branch
const MIN_HEIGHT = 150; // Minimal HTML element height for the branches list
const MAX_HEIGHT = 400; // Maximal HTML element height for the branches list
/**
 * Callback invoked upon encountering an error when switching branches.
 *
 * @private
 * @param error - error
 * @param id - notification id
 * @param trans - translation object
 */
function onBranchError(error, id, trans) {
    if (error.message.includes('following files would be overwritten')) {
        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.dismiss(id);
        (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
            title: trans.__('Unable to switch branch'),
            body: (react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null,
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", null, trans.__('Your changes to the following files would be overwritten by switching:')),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material_List__WEBPACK_IMPORTED_MODULE_4__["default"], null, error.message.split('\n').slice(1, -3).map(renderFileName)),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, trans.__('Please commit, stash, or discard your changes before you switch branches.')))),
            buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({ label: trans.__('Dismiss') })]
        });
    }
    else {
        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.update({
            id,
            message: trans.__('Failed to switch branch.'),
            type: 'error',
            ...(0,_notifications__WEBPACK_IMPORTED_MODULE_5__.showError)(error, trans)
        });
    }
}
/**
 * Renders a file name.
 *
 * @private
 * @param filename - file name
 * @returns React element
 */
function renderFileName(filename) {
    return react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material_ListItem__WEBPACK_IMPORTED_MODULE_6__["default"], { key: filename }, filename);
}
/**
 * React component for rendering a branch menu.
 */
class BranchMenu extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
    /**
     * Returns a React component for rendering a branch menu.
     *
     * @param props - component properties
     * @returns React component
     */
    constructor(props) {
        super(props);
        this.CHANGES_ERR_MSG = this.props.trans.__('The current branch contains files with uncommitted changes. Please commit or discard these changes before switching to or creating another branch.');
        /**
         * Renders a menu item.
         *
         * @param props Row properties
         * @returns React element
         */
        this._renderItem = (props) => {
            const { data, index, style } = props;
            const branch = data[index];
            const isActive = branch.is_current_branch;
            return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material_ListItem__WEBPACK_IMPORTED_MODULE_6__["default"], { button: true, title: !isActive
                    ? this.props.trans.__('Switch to branch: %1', branch.name)
                    : '', className: (0,typestyle__WEBPACK_IMPORTED_MODULE_3__.classes)(_style_BranchMenu__WEBPACK_IMPORTED_MODULE_7__.listItemClass, isActive ? _style_BranchMenu__WEBPACK_IMPORTED_MODULE_7__.activeListItemClass : null), onClick: this._onBranchClickFactory(branch.name), role: "listitem", style: style },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement(_style_icons__WEBPACK_IMPORTED_MODULE_8__.branchIcon.react, { className: _style_BranchMenu__WEBPACK_IMPORTED_MODULE_7__.listItemIconClass, tag: "span" }),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _style_BranchMenu__WEBPACK_IMPORTED_MODULE_7__.nameClass }, branch.name),
                !branch.is_remote_branch && !isActive && (react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null,
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_9__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_10__.hiddenButtonStyle, icon: _style_icons__WEBPACK_IMPORTED_MODULE_8__.trashIcon, title: this.props.trans.__('Delete this branch locally'), onClick: async (event) => {
                            event === null || event === void 0 ? void 0 : event.stopPropagation();
                            await this._onDeleteBranch(branch.name);
                        } }),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_9__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_10__.hiddenButtonStyle, icon: _style_icons__WEBPACK_IMPORTED_MODULE_8__.mergeIcon, title: this.props.trans.__('Merge this branch into the current one'), onClick: (event) => {
                            event === null || event === void 0 ? void 0 : event.stopPropagation();
                            this._onMergeBranch(branch.name);
                        } })))));
        };
        /**
         * Callback invoked upon a change to the menu filter.
         *
         * @param event - event object
         */
        this._onFilterChange = (event) => {
            this.setState({
                filter: event.target.value
            });
        };
        /**
         * Callback invoked to reset the menu filter.
         */
        this._resetFilter = () => {
            this.setState({
                filter: ''
            });
        };
        /**
         * Callback on delete branch name button
         *
         * @param branchName Branch name
         */
        this._onDeleteBranch = async (branchName) => {
            const acknowledgement = await (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                title: this.props.trans.__('Delete branch'),
                body: (react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", null,
                    this.props.trans.__('Are you sure you want to permanently delete the branch '),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("b", null, branchName),
                    "?",
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("br", null),
                    this.props.trans.__('This action cannot be undone.'))),
                buttons: [
                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.cancelButton({ label: this.props.trans.__('Cancel') }),
                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.warnButton({ label: this.props.trans.__('Delete') })
                ]
            });
            if (acknowledgement.button.accept) {
                try {
                    await this.props.model.deleteBranch(branchName);
                    await this.props.model.refreshBranch();
                }
                catch (error) {
                    console.error(`Failed to delete branch ${branchName}`, error);
                }
            }
        };
        /**
         * Callback on merge branch name button
         *
         * @param branchName Branch name
         */
        this._onMergeBranch = async (branch) => {
            await this.props.commands.execute(_tokens__WEBPACK_IMPORTED_MODULE_11__.CommandIDs.gitMerge, { branch });
        };
        /**
         * Callback invoked upon clicking a button to create a new branch.
         *
         * @param event - event object
         */
        this._onNewBranchClick = () => {
            if (!this.props.branching) {
                (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)(this.props.trans.__('Creating a new branch is disabled'), this.CHANGES_ERR_MSG);
                return;
            }
            this.setState({
                branchDialog: true
            });
        };
        /**
         * Callback invoked upon closing a dialog to create a new branch.
         */
        this._onNewBranchDialogClose = () => {
            this.setState({
                branchDialog: false
            });
        };
        this.state = {
            filter: '',
            branchDialog: false
        };
    }
    /**
     * Renders the component.
     *
     * @returns React element
     */
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_BranchMenu__WEBPACK_IMPORTED_MODULE_7__.wrapperClass },
            this._renderFilter(),
            this._renderBranchList(),
            this._renderNewBranchDialog()));
    }
    /**
     * Renders a branch input filter.
     *
     * @returns React element
     */
    _renderFilter() {
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_BranchMenu__WEBPACK_IMPORTED_MODULE_7__.filterWrapperClass },
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_BranchMenu__WEBPACK_IMPORTED_MODULE_7__.filterClass },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { className: _style_BranchMenu__WEBPACK_IMPORTED_MODULE_7__.filterInputClass, type: "text", onChange: this._onFilterChange, value: this.state.filter, placeholder: this.props.trans.__('Filter'), title: this.props.trans.__('Filter branch menu') }),
                this.state.filter ? (react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _style_BranchMenu__WEBPACK_IMPORTED_MODULE_7__.filterClearClass },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_icons_material_Clear__WEBPACK_IMPORTED_MODULE_12__["default"], { titleAccess: this.props.trans.__('Clear the current filter'), fontSize: "small", onClick: this._resetFilter }))) : null),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { className: _style_BranchMenu__WEBPACK_IMPORTED_MODULE_7__.newBranchButtonClass, type: "button", title: this.props.trans.__('Create a new branch'), value: this.props.trans.__('New Branch'), onClick: this._onNewBranchClick })));
    }
    /**
     * Renders a
     *
     * @returns React element
     */
    _renderBranchList() {
        // Perform a "simple" filter... (TODO: consider implementing fuzzy filtering)
        const filter = this.state.filter;
        const branches = this.props.branches.filter(branch => {
            // Don't include "current branch" is the repository is not in default state
            if (this.props.model.status.state !== _tokens__WEBPACK_IMPORTED_MODULE_11__.Git.State.DEFAULT &&
                branch.is_current_branch) {
                return false;
            }
            return !filter || branch.name.includes(filter);
        });
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_window__WEBPACK_IMPORTED_MODULE_2__.FixedSizeList, { height: Math.min(Math.max(MIN_HEIGHT, branches.length * ITEM_HEIGHT), MAX_HEIGHT), itemCount: branches.length, itemData: branches, itemKey: (index, data) => data[index].name, itemSize: ITEM_HEIGHT, style: { overflowX: 'hidden', paddingTop: 0, paddingBottom: 0 }, width: 'auto' }, this._renderItem));
    }
    /**
     * Renders a dialog for creating a new branch.
     *
     * @returns React element
     */
    _renderNewBranchDialog() {
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_NewBranchDialog__WEBPACK_IMPORTED_MODULE_13__.NewBranchDialog, { currentBranch: this.props.currentBranch, branches: this.props.branches, open: this.state.branchDialog, model: this.props.model, onClose: this._onNewBranchDialogClose, trans: this.props.trans }));
    }
    /**
     * Returns a callback which is invoked upon clicking a branch name.
     *
     * @param branch - branch name
     * @returns callback
     */
    _onBranchClickFactory(branch) {
        /**
         * Callback invoked upon clicking a branch name.
         *
         * @private
         * @param event - event object
         * @returns promise which resolves upon attempting to switch branches
         */
        const onClick = async () => {
            if (!this.props.branching) {
                (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)(this.props.trans.__('Switching branches is disabled'), this.CHANGES_ERR_MSG);
                return;
            }
            const opts = {
                branchname: branch
            };
            const id = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.emit(this.props.trans.__('Switching branch…'), 'in-progress', { autoClose: false });
            try {
                await this.props.model.checkout(opts);
            }
            catch (err) {
                return onBranchError(err, id, this.props.trans);
            }
            _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.update({
                id,
                message: this.props.trans.__('Switched branch.'),
                type: 'success',
                autoClose: 5000
            });
        };
        return onClick;
    }
}


/***/ }),

/***/ "./lib/components/BranchPicker.js":
/*!****************************************!*\
  !*** ./lib/components/BranchPicker.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BranchPicker: () => (/* binding */ BranchPicker)
/* harmony export */ });
/* harmony import */ var _mui_material_Dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material/Dialog */ "./node_modules/@mui/material/Dialog/Dialog.js");
/* harmony import */ var _mui_material_DialogActions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material/DialogActions */ "./node_modules/@mui/material/DialogActions/DialogActions.js");
/* harmony import */ var _mui_material_ListItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/ListItem */ "./node_modules/@mui/material/ListItem/ListItem.js");
/* harmony import */ var _mui_icons_material_Clear__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/icons-material/Clear */ "./node_modules/@mui/icons-material/Clear.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_window__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-window */ "webpack/sharing/consume/default/react-window/react-window");
/* harmony import */ var react_window__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_window__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../style/icons */ "./lib/style/icons.js");
/* harmony import */ var _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../style/NewBranchDialog */ "./lib/style/NewBranchDialog.js");









const ITEM_HEIGHT = 27.5; // HTML element height for a single branch
const HEIGHT = 200; // HTML element height for the branches list
/**
 * BranchPicker React component
 *
 * @param props Component properties
 * @returns React element
 */
function BranchPicker(props) {
    const [filter, setFilter] = react__WEBPACK_IMPORTED_MODULE_0___default().useState('');
    const [selectedBranch, setSelectedBranch] = react__WEBPACK_IMPORTED_MODULE_0___default().useState(null);
    const branches = props.branches.filter(branch => !filter || branch.name.includes(filter));
    const { action, trans } = props;
    const act = action !== null && action !== void 0 ? action : 'merge';
    function renderItem(props) {
        const { data, index, style } = props;
        const branch = data[index];
        const isSelected = branch.name === selectedBranch;
        return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_ListItem__WEBPACK_IMPORTED_MODULE_3__["default"], { button: true, title: act === 'merge'
                ? trans.__('Merge branch %1', branch.name)
                : trans.__('Rebase branch %1', branch.name), className: (0,typestyle__WEBPACK_IMPORTED_MODULE_2__.classes)(_style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.listItemClass, isSelected ? _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.activeListItemClass : null), onClick: () => {
                setSelectedBranch(branch.name);
            }, style: style },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_style_icons__WEBPACK_IMPORTED_MODULE_5__.branchIcon.react, { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.listItemIconClass, tag: "span" }),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.listItemContentClass },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.listItemTitleClass }, branch.name))));
    }
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Dialog__WEBPACK_IMPORTED_MODULE_6__["default"], { classes: {
            paper: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.branchDialogClass
        }, open: true, onClose: () => {
            props.onClose();
        } },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.titleWrapperClass },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.titleClass }, act === 'merge'
                ? trans.__('Merge Branch')
                : trans.__('Rebase Branch')),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.closeButtonClass },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_icons_material_Clear__WEBPACK_IMPORTED_MODULE_7__["default"], { titleAccess: trans.__('Close this dialog'), fontSize: "small", onClick: () => {
                        props.onClose();
                    } }))),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.contentWrapperClass },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, act === 'merge'
                ? trans.__('Select the branch to merge in %1', props.currentBranch)
                : trans.__('Select the branch to rebase %1 onto', props.currentBranch)),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.filterWrapperClass },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.filterClass },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.filterInputClass, type: "text", onChange: event => {
                            setFilter(event.target.value);
                        }, value: filter, placeholder: trans.__('Filter'), title: trans.__('Filter branch list') }),
                    filter ? (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.filterClearClass },
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_icons_material_Clear__WEBPACK_IMPORTED_MODULE_7__["default"], { titleAccess: trans.__('Clear the current filter'), fontSize: "small", onClick: () => {
                                setFilter('');
                            } }))) : null)),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_window__WEBPACK_IMPORTED_MODULE_1__.FixedSizeList, { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.listWrapperClass, height: HEIGHT, itemSize: ITEM_HEIGHT, itemCount: branches.length, itemData: branches, itemKey: (index, data) => data[index].name, style: { overflowX: 'hidden' }, width: 'auto' }, renderItem)),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_DialogActions__WEBPACK_IMPORTED_MODULE_8__["default"], { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.actionsWrapperClass },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", { className: (0,typestyle__WEBPACK_IMPORTED_MODULE_2__.classes)(_style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.buttonClass, _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.cancelButtonClass), type: "button", title: act === 'merge'
                    ? trans.__('Close this dialog without merging a branch')
                    : trans.__('Close this dialog without rebasing the branch'), value: trans.__('Cancel'), onClick: () => {
                    props.onClose();
                } }),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", { className: (0,typestyle__WEBPACK_IMPORTED_MODULE_2__.classes)(_style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.buttonClass, _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_4__.createButtonClass), type: "button", title: act === 'merge'
                    ? trans.__('Merge branch')
                    : trans.__('Rebase branch'), value: act === 'merge' ? trans.__('Merge') : trans.__('Rebase'), onClick: () => {
                    props.onClose(selectedBranch !== null && selectedBranch !== void 0 ? selectedBranch : undefined);
                }, disabled: selectedBranch === null }))));
}


/***/ }),

/***/ "./lib/components/CommitBox.js":
/*!*************************************!*\
  !*** ./lib/components/CommitBox.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CommitBox: () => (/* binding */ CommitBox)
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_commands__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/commands */ "webpack/sharing/consume/default/@lumino/commands");
/* harmony import */ var _lumino_commands__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_commands__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material/Button */ "./node_modules/@mui/material/Button/Button.js");
/* harmony import */ var _mui_material_ButtonGroup__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material/ButtonGroup */ "./node_modules/@mui/material/ButtonGroup/ButtonGroup.js");
/* harmony import */ var _mui_material_ClickAwayListener__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @mui/material/ClickAwayListener */ "./node_modules/@mui/base/ClickAwayListener/ClickAwayListener.js");
/* harmony import */ var _mui_material_Grow__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/material/Grow */ "./node_modules/@mui/material/Grow/Grow.js");
/* harmony import */ var _mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @mui/material/MenuItem */ "./node_modules/@mui/material/MenuItem/MenuItem.js");
/* harmony import */ var _mui_material_MenuList__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @mui/material/MenuList */ "./node_modules/@mui/material/MenuList/MenuList.js");
/* harmony import */ var _mui_material_Paper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mui/material/Paper */ "./node_modules/@mui/material/Paper/Paper.js");
/* harmony import */ var _mui_material_Popper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/material/Popper */ "./node_modules/@mui/material/Popper/Popper.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_BranchMenu__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../style/BranchMenu */ "./lib/style/BranchMenu.js");
/* harmony import */ var _style_CommitBox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../style/CommitBox */ "./lib/style/CommitBox.js");
/* harmony import */ var _style_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../style/icons */ "./lib/style/icons.js");
/* harmony import */ var _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../style/NewBranchDialog */ "./lib/style/NewBranchDialog.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tokens */ "./lib/tokens.js");
/* harmony import */ var _CommitMessage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CommitMessage */ "./lib/components/CommitMessage.js");


















/**
 * React component for entering a commit message.
 */
class CommitBox extends react__WEBPACK_IMPORTED_MODULE_2__.Component {
    /**
     * Returns a React component for entering a commit message.
     *
     * @param props - component properties
     * @returns React component
     */
    constructor(props) {
        super(props);
        /**
         * Get keystroke configured to act as a submit action.
         */
        this._getSubmitKeystroke = () => {
            var _a;
            const binding = this.props.commands.keyBindings.find(binding => binding.command === _tokens__WEBPACK_IMPORTED_MODULE_4__.CommandIDs.gitSubmitCommand);
            return (_a = binding === null || binding === void 0 ? void 0 : binding.keys.join(' ')) !== null && _a !== void 0 ? _a : '';
        };
        /**
         * Close the commit variant menu if needed.
         */
        this._handleClose = (event) => {
            if (this._anchorRef.current &&
                this._anchorRef.current.contains(event.target)) {
                return;
            }
            this.setState({ open: false });
        };
        /**
         * Handle commit variant menu item click
         */
        this._handleMenuItemClick = (event, index) => {
            this.setState({
                open: false
            });
            this.props.setAmend(index === 1);
        };
        /**
         * Toggle state of the commit variant menu visibility
         */
        this._handleToggle = () => {
            this.setState({ open: !this.state.open });
        };
        /**
         * Callback invoked upon command execution activated when entering a commit message description.
         *
         * ## Notes
         *
         * -   Triggers the `'submit'` action on appropriate command (and if commit is possible)
         *
         */
        this._handleCommand = (_, commandArgs) => {
            if (commandArgs.id === _tokens__WEBPACK_IMPORTED_MODULE_4__.CommandIDs.gitSubmitCommand && this._canCommit()) {
                this.props.onCommit();
            }
        };
        this._options = [];
        this._options.push({
            title: this.props.trans.__('Create a new commit'),
            description: this.props.trans.__('New commit will be created and show up as a next one after the previous commit (default).')
        }, {
            title: this.props.trans.__('Amend previous commit'),
            description: this.props.trans.__('Staged changes will be added to the previous commit and its date will be updated.')
        });
        this._anchorRef = react__WEBPACK_IMPORTED_MODULE_2__.createRef();
        this.state = {
            open: false
        };
    }
    componentDidMount() {
        this.props.commands.commandExecuted.connect(this._handleCommand);
    }
    componentWillUnmount() {
        this.props.commands.commandExecuted.disconnect(this._handleCommand);
    }
    /**
     * Renders the component.
     *
     * @returns React element
     */
    render() {
        var _a;
        const disabled = !this._canCommit();
        const title = !this.props.hasFiles
            ? this.props.trans.__('Disabled: No files are staged for commit')
            : !this.props.summary && !this.props.amend
                ? this.props.trans.__('Disabled: No commit message summary')
                : this.props.label;
        const shortcutHint = _lumino_commands__WEBPACK_IMPORTED_MODULE_1__.CommandRegistry.formatKeystroke(this._getSubmitKeystroke());
        const summaryPlaceholder = this.props.trans.__('Summary (%1 to commit)', shortcutHint);
        return (react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", { className: (0,typestyle__WEBPACK_IMPORTED_MODULE_3__.classes)(_style_CommitBox__WEBPACK_IMPORTED_MODULE_5__.commitFormClass, 'jp-git-CommitBox') }, (_a = this.props.warning) !== null && _a !== void 0 ? _a : null,
            !this.props.amend && (react__WEBPACK_IMPORTED_MODULE_2__.createElement(_CommitMessage__WEBPACK_IMPORTED_MODULE_6__.CommitMessage, { error: this.props.hasFiles &&
                    !this.props.amend &&
                    this.props.summary.length === 0, trans: this.props.trans, summary: this.props.summary, summaryPlaceholder: summaryPlaceholder, description: this.props.description, setSummary: this.props.setSummary, setDescription: this.props.setDescription })),
            react__WEBPACK_IMPORTED_MODULE_2__.createElement(_mui_material_ButtonGroup__WEBPACK_IMPORTED_MODULE_7__["default"], { ref: this._anchorRef, fullWidth: true, size: "small" },
                react__WEBPACK_IMPORTED_MODULE_2__.createElement(_mui_material_Button__WEBPACK_IMPORTED_MODULE_8__["default"], { classes: {
                        root: _style_CommitBox__WEBPACK_IMPORTED_MODULE_5__.commitButtonClass,
                        disabled: _style_CommitBox__WEBPACK_IMPORTED_MODULE_5__.disabledStyle
                    }, title: title, disabled: disabled, onClick: this.props.onCommit }, this.props.label),
                react__WEBPACK_IMPORTED_MODULE_2__.createElement(_mui_material_Button__WEBPACK_IMPORTED_MODULE_8__["default"], { classes: {
                        root: (0,typestyle__WEBPACK_IMPORTED_MODULE_3__.classes)(_style_CommitBox__WEBPACK_IMPORTED_MODULE_5__.commitButtonClass, _style_CommitBox__WEBPACK_IMPORTED_MODULE_5__.commitVariantSelector)
                    }, size: "small", "aria-controls": this.state.open ? 'split-button-menu' : undefined, "aria-expanded": this.state.open ? 'true' : undefined, "aria-label": "select commit variant", "aria-haspopup": "menu", onClick: this._handleToggle },
                    react__WEBPACK_IMPORTED_MODULE_2__.createElement(_style_icons__WEBPACK_IMPORTED_MODULE_9__.verticalMoreIcon.react, { tag: "span" }))),
            react__WEBPACK_IMPORTED_MODULE_2__.createElement(_mui_material_Popper__WEBPACK_IMPORTED_MODULE_10__["default"], { open: this.state.open, anchorEl: this._anchorRef.current, role: undefined, transition: true, disablePortal: true }, ({ TransitionProps }) => (react__WEBPACK_IMPORTED_MODULE_2__.createElement(_mui_material_Grow__WEBPACK_IMPORTED_MODULE_11__["default"], { ...TransitionProps },
                react__WEBPACK_IMPORTED_MODULE_2__.createElement(_mui_material_Paper__WEBPACK_IMPORTED_MODULE_12__["default"], { classes: { root: (0,typestyle__WEBPACK_IMPORTED_MODULE_3__.classes)(_style_CommitBox__WEBPACK_IMPORTED_MODULE_5__.commitRoot, _style_CommitBox__WEBPACK_IMPORTED_MODULE_5__.commitPaperClass) } },
                    react__WEBPACK_IMPORTED_MODULE_2__.createElement(_mui_material_ClickAwayListener__WEBPACK_IMPORTED_MODULE_13__.ClickAwayListener, { onClickAway: this._handleClose },
                        react__WEBPACK_IMPORTED_MODULE_2__.createElement(_mui_material_MenuList__WEBPACK_IMPORTED_MODULE_14__["default"], { id: "split-button-menu" }, this._options.map((option, index) => (react__WEBPACK_IMPORTED_MODULE_2__.createElement(_mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_15__["default"], { key: option.title, classes: { root: _style_CommitBox__WEBPACK_IMPORTED_MODULE_5__.commitRoot }, selected: this.props.amend ? index === 1 : index === 0, onClick: event => this._handleMenuItemClick(event, index) },
                            (this.props.amend ? index === 1 : index === 0) ? (react__WEBPACK_IMPORTED_MODULE_2__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.checkIcon.react, { className: _style_BranchMenu__WEBPACK_IMPORTED_MODULE_16__.listItemIconClass, tag: "span" })) : (react__WEBPACK_IMPORTED_MODULE_2__.createElement("span", { className: _style_BranchMenu__WEBPACK_IMPORTED_MODULE_16__.listItemIconClass })),
                            react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_17__.listItemContentClass },
                                react__WEBPACK_IMPORTED_MODULE_2__.createElement("p", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_17__.listItemBoldTitleClass }, option.title),
                                react__WEBPACK_IMPORTED_MODULE_2__.createElement("p", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_17__.listItemDescClass }, option.description)))))))))))));
    }
    /**
     * Whether a commit can be performed (files are staged and summary is not empty).
     */
    _canCommit() {
        if (this.props.amend) {
            return this.props.hasFiles;
        }
        return !!(this.props.hasFiles && this.props.summary);
    }
}


/***/ }),

/***/ "./lib/components/CommitComparisonBox.js":
/*!***********************************************!*\
  !*** ./lib/components/CommitComparisonBox.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CommitComparisonBox: () => (/* binding */ CommitComparisonBox)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _notifications__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../notifications */ "./lib/notifications.js");
/* harmony import */ var _style_CommitComparisonBox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../style/CommitComparisonBox */ "./lib/style/CommitComparisonBox.js");
/* harmony import */ var _style_GitStageStyle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../style/GitStageStyle */ "./lib/style/GitStageStyle.js");
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ActionButton */ "./lib/components/ActionButton.js");
/* harmony import */ var _CommitDiff__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./CommitDiff */ "./lib/components/CommitDiff.js");








/**
 * A component which displays a comparison between two commits.
 */
function CommitComparisonBox(props) {
    var _a;
    const [collapsed, setCollapsed] = react__WEBPACK_IMPORTED_MODULE_2__.useState(false);
    const [files, setFiles] = react__WEBPACK_IMPORTED_MODULE_2__.useState([]);
    const { referenceCommit, challengerCommit, model } = props;
    const hasDiff = referenceCommit !== null && challengerCommit !== null;
    const totalInsertions = files.reduce((acc, file) => {
        const insertions = Number.parseInt(file.insertion, 10);
        return acc + (Number.isNaN(insertions) ? 0 : insertions);
    }, 0);
    const totalDeletions = files.reduce((acc, file) => {
        const deletions = Number.parseInt(file.deletion, 10);
        return acc + (Number.isNaN(deletions) ? 0 : deletions);
    }, 0);
    react__WEBPACK_IMPORTED_MODULE_2__.useEffect(() => {
        (async () => {
            var _a;
            if (referenceCommit === null || challengerCommit === null) {
                setFiles([]);
                return;
            }
            let diffResult = null;
            try {
                diffResult = await model.diff(referenceCommit.commit, challengerCommit.commit);
                if (diffResult.code !== 0) {
                    throw new Error(diffResult.message);
                }
            }
            catch (err) {
                const msg = `Failed to get the diff for ${referenceCommit.commit} and ${challengerCommit.commit}.`;
                console.error(msg, err);
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.error(msg, (0,_notifications__WEBPACK_IMPORTED_MODULE_3__.showError)(err, props.trans));
                return;
            }
            if (diffResult) {
                setFiles(((_a = diffResult.result) !== null && _a !== void 0 ? _a : []).map(changedFile => {
                    const pathParts = changedFile.filename.split('/');
                    const fileName = pathParts[pathParts.length - 1];
                    const filePath = changedFile.filename;
                    return {
                        deletion: changedFile.deletions,
                        insertion: changedFile.insertions,
                        is_binary: changedFile.deletions === '-' || changedFile.insertions === '-',
                        modified_file_name: fileName,
                        modified_file_path: filePath,
                        type: changedFile.filetype
                    };
                }));
            }
            else {
                setFiles([]);
            }
        })();
    }, [referenceCommit, challengerCommit]);
    return (react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", { className: _style_CommitComparisonBox__WEBPACK_IMPORTED_MODULE_4__.commitComparisonBoxStyle },
        react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", { className: _style_GitStageStyle__WEBPACK_IMPORTED_MODULE_5__.sectionAreaStyle, onClick: () => setCollapsed(!collapsed) },
            react__WEBPACK_IMPORTED_MODULE_2__.createElement("button", { className: _style_GitStageStyle__WEBPACK_IMPORTED_MODULE_5__.changeStageButtonStyle }, collapsed ? (react__WEBPACK_IMPORTED_MODULE_2__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__.caretRightIcon.react, { tag: "span" })) : (react__WEBPACK_IMPORTED_MODULE_2__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__.caretDownIcon.react, { tag: "span" }))),
            react__WEBPACK_IMPORTED_MODULE_2__.createElement("span", { className: _style_GitStageStyle__WEBPACK_IMPORTED_MODULE_5__.sectionHeaderLabelStyle }, props.header),
            react__WEBPACK_IMPORTED_MODULE_2__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_6__.ActionButton, { title: props.trans.__('Close'), icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__.closeIcon, onClick: (event) => {
                    props.onClose(event);
                } })),
        !collapsed &&
            (files.length ? (react__WEBPACK_IMPORTED_MODULE_2__.createElement(_CommitDiff__WEBPACK_IMPORTED_MODULE_7__.CommitDiff, { className: _style_CommitComparisonBox__WEBPACK_IMPORTED_MODULE_4__.commitComparisonDiffStyle, deletions: `${totalDeletions}`, files: files, insertions: `${totalInsertions}`, numFiles: `${files.length}`, onOpenDiff: (_a = props.onOpenDiff) !== null && _a !== void 0 ? _a : (() => () => {
                    /* no-op */
                }), trans: props.trans })) : (react__WEBPACK_IMPORTED_MODULE_2__.createElement("p", null, hasDiff
                ? props.trans.__('No changes')
                : props.trans.__('No challenger commit selected.'))))));
}


/***/ }),

/***/ "./lib/components/CommitDiff.js":
/*!**************************************!*\
  !*** ./lib/components/CommitDiff.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CommitDiff: () => (/* binding */ CommitDiff)
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_window__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-window */ "webpack/sharing/consume/default/react-window/react-window");
/* harmony import */ var react_window__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_window__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../model */ "./lib/model.js");
/* harmony import */ var _style_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../style/icons */ "./lib/style/icons.js");
/* harmony import */ var _style_SinglePastCommitInfo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../style/SinglePastCommitInfo */ "./lib/style/SinglePastCommitInfo.js");
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ActionButton */ "./lib/components/ActionButton.js");
/* harmony import */ var _FilePath__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./FilePath */ "./lib/components/FilePath.js");









/**
 * File list item height
 */
const ITEM_HEIGHT = 24;
/**
 * Maximal number of file display at once
 */
const MAX_VISIBLE_FILES = 5;
/**
 * Display differences between two commits
 */
class CommitDiff extends react__WEBPACK_IMPORTED_MODULE_1__.PureComponent {
    constructor() {
        super(...arguments);
        this._renderFile = (props) => {
            const { data, index, style } = props;
            const file = data[index];
            const path = file.modified_file_path;
            const previous = file.previous_file_path;
            const flg = !!(0,_model__WEBPACK_IMPORTED_MODULE_4__.getDiffProvider)(path) || !file.is_binary;
            return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("li", { className: _style_SinglePastCommitInfo__WEBPACK_IMPORTED_MODULE_5__.commitDetailFileClass, onClick: this.props.onOpenDiff(path, flg, previous), style: style, title: path },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement(_FilePath__WEBPACK_IMPORTED_MODULE_6__.FilePath, { filepath: path, filetype: file.type }),
                flg ? (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_7__.ActionButton, { icon: _style_icons__WEBPACK_IMPORTED_MODULE_8__.diffIcon, title: this.props.trans.__('View file changes') })) : null));
        };
    }
    render() {
        var _a;
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: this.props.className },
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_SinglePastCommitInfo__WEBPACK_IMPORTED_MODULE_5__.commitClass },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_SinglePastCommitInfo__WEBPACK_IMPORTED_MODULE_5__.commitOverviewNumbersClass },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { title: this.props.trans.__('# Files Changed') },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.fileIcon.react, { className: _style_SinglePastCommitInfo__WEBPACK_IMPORTED_MODULE_5__.iconClass, tag: "span" }),
                        this.props.numFiles),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { title: this.props.trans.__('# Insertions') },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement(_style_icons__WEBPACK_IMPORTED_MODULE_8__.insertionsMadeIcon.react, { className: (0,typestyle__WEBPACK_IMPORTED_MODULE_3__.classes)(_style_SinglePastCommitInfo__WEBPACK_IMPORTED_MODULE_5__.iconClass, _style_SinglePastCommitInfo__WEBPACK_IMPORTED_MODULE_5__.insertionsIconClass), tag: "span" }),
                        this.props.insertions),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { title: this.props.trans.__('# Deletions') },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement(_style_icons__WEBPACK_IMPORTED_MODULE_8__.deletionsMadeIcon.react, { className: (0,typestyle__WEBPACK_IMPORTED_MODULE_3__.classes)(_style_SinglePastCommitInfo__WEBPACK_IMPORTED_MODULE_5__.iconClass, _style_SinglePastCommitInfo__WEBPACK_IMPORTED_MODULE_5__.deletionsIconClass), tag: "span" }),
                        this.props.deletions))),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_SinglePastCommitInfo__WEBPACK_IMPORTED_MODULE_5__.commitDetailClass },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_SinglePastCommitInfo__WEBPACK_IMPORTED_MODULE_5__.commitDetailHeaderClass },
                    this.props.trans.__('Changed'), (_a = this.props.actions) !== null && _a !== void 0 ? _a : null),
                this.props.files.length > 0 && (react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_window__WEBPACK_IMPORTED_MODULE_2__.FixedSizeList, { className: _style_SinglePastCommitInfo__WEBPACK_IMPORTED_MODULE_5__.fileListClass, height: Math.min(MAX_VISIBLE_FILES, this.props.files.length) *
                        ITEM_HEIGHT, innerElementType: "ul", itemCount: this.props.files.length, itemData: this.props.files, itemKey: (index, data) => data[index].modified_file_path, itemSize: ITEM_HEIGHT, style: { overflowX: 'hidden' }, width: 'auto' }, this._renderFile)))));
    }
}


/***/ }),

/***/ "./lib/components/CommitMessage.js":
/*!*****************************************!*\
  !*** ./lib/components/CommitMessage.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CommitMessage: () => (/* binding */ CommitMessage)
/* harmony export */ });
/* harmony import */ var _mui_material_Input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/Input */ "./node_modules/@mui/material/Input/Input.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_CommitBox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../style/CommitBox */ "./lib/style/CommitBox.js");




/**
 * Commit message component
 */
function CommitMessage(props) {
    var _a, _b, _c, _d;
    const summaryPlaceholder = (_a = props.summaryPlaceholder) !== null && _a !== void 0 ? _a : props.trans.__('Summary');
    /**
     * Callback invoked upon updating a commit message description.
     *
     * @param event - event object
     */
    function onDescriptionChange(event) {
        props.setDescription(event.target.value);
    }
    /**
     * Callback invoked upon updating a commit message summary.
     *
     * @param event - event object
     */
    function onSummaryChange(event) {
        props.setSummary(event.target.value);
    }
    /**
     * Callback invoked upon a `'keypress'` event when entering a commit message summary.
     *
     * ## Notes
     *
     * -   Prevents triggering a `'submit'` action when hitting the `ENTER` key while entering a commit message summary.
     *
     * @param event - event object
     */
    function onSummaryKeyPress(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Input__WEBPACK_IMPORTED_MODULE_2__["default"], { classes: {
                root: (0,typestyle__WEBPACK_IMPORTED_MODULE_1__.classes)(_style_CommitBox__WEBPACK_IMPORTED_MODULE_3__.commitRoot, _style_CommitBox__WEBPACK_IMPORTED_MODULE_3__.commitSummaryClass),
                focused: _style_CommitBox__WEBPACK_IMPORTED_MODULE_3__.activeStyle,
                disabled: _style_CommitBox__WEBPACK_IMPORTED_MODULE_3__.disabledStyle
            }, error: props.error, type: "text", placeholder: summaryPlaceholder, title: props.disabled
                ? props.trans.__('Amending the commit will re-use the previous commit summary')
                : props.trans.__('Enter a commit message summary (a single line, preferably less than 50 characters)'), value: props.summary, onChange: onSummaryChange, onKeyPress: onSummaryKeyPress, disabled: (_b = props.disabled) !== null && _b !== void 0 ? _b : false, disableUnderline: true, fullWidth: true }),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Input__WEBPACK_IMPORTED_MODULE_2__["default"], { classes: {
                root: (0,typestyle__WEBPACK_IMPORTED_MODULE_1__.classes)(_style_CommitBox__WEBPACK_IMPORTED_MODULE_3__.commitRoot, _style_CommitBox__WEBPACK_IMPORTED_MODULE_3__.commitDescriptionClass),
                focused: _style_CommitBox__WEBPACK_IMPORTED_MODULE_3__.activeStyle,
                disabled: _style_CommitBox__WEBPACK_IMPORTED_MODULE_3__.disabledStyle
            }, multiline: true, minRows: 5, maxRows: 10, placeholder: (_c = props.descriptionPlaceholder) !== null && _c !== void 0 ? _c : props.trans.__('Description (optional)'), title: props.disabled
                ? props.trans.__('Amending the commit will re-use the previous commit summary')
                : props.trans.__('Enter a commit message description'), value: props.description, onChange: onDescriptionChange, disabled: (_d = props.disabled) !== null && _d !== void 0 ? _d : false, disableUnderline: true, fullWidth: true })));
}


/***/ }),

/***/ "./lib/components/FileItem.js":
/*!************************************!*\
  !*** ./lib/components/FileItem.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FileItem: () => (/* binding */ FileItem)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_FileItemStyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../style/FileItemStyle */ "./lib/style/FileItemStyle.js");
/* harmony import */ var _style_FilePathStyle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../style/FilePathStyle */ "./lib/style/FilePathStyle.js");
/* harmony import */ var _FilePath__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FilePath */ "./lib/components/FilePath.js");





/**
 * Render the selection box in simple mode
 */
class GitMarkBox extends react__WEBPACK_IMPORTED_MODULE_0__.PureComponent {
    constructor() {
        super(...arguments);
        this._onDoubleClick = (event) => {
            event.stopPropagation();
        };
    }
    render() {
        // idempotent, will only run once per file
        this.props.model.addMark(this.props.fname, this.props.stage !== 'untracked');
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { name: "gitMark", className: _style_FileItemStyle__WEBPACK_IMPORTED_MODULE_2__.gitMarkBoxStyle, type: "checkbox", checked: this.props.checked, onDoubleClick: this._onDoubleClick }));
    }
}
class FileItem extends react__WEBPACK_IMPORTED_MODULE_0__.PureComponent {
    constructor(props) {
        super(props);
        this._onClick = (event) => {
            if (this.props.markBox) {
                if (event.shiftKey) {
                    this.props.markUntilFile(this.props.file);
                }
                else {
                    this.props.model.toggleMark(this.props.file.to);
                    this.props.setSelection(this.props.file, { singleton: true });
                }
            }
            else {
                if (event.ctrlKey || event.metaKey) {
                    this.props.setSelection(this.props.file);
                }
                else if (event.shiftKey) {
                    this.props.setSelection(this.props.file, { group: true });
                }
                else {
                    this.props.setSelection(this.props.file, { singleton: true });
                }
            }
        };
    }
    _getFileChangedLabel(change, trans) {
        return Private.get_status(change, trans) || trans.__('Unmodified');
    }
    _getFileChangedLabelClass(change) {
        if (change === 'M') {
            return this.props.selected
                ? (0,typestyle__WEBPACK_IMPORTED_MODULE_1__.classes)(_style_FileItemStyle__WEBPACK_IMPORTED_MODULE_2__.fileChangedLabelStyle, _style_FileItemStyle__WEBPACK_IMPORTED_MODULE_2__.fileChangedLabelBrandStyle, _style_FileItemStyle__WEBPACK_IMPORTED_MODULE_2__.selectedFileChangedLabelStyle)
                : (0,typestyle__WEBPACK_IMPORTED_MODULE_1__.classes)(_style_FileItemStyle__WEBPACK_IMPORTED_MODULE_2__.fileChangedLabelStyle, _style_FileItemStyle__WEBPACK_IMPORTED_MODULE_2__.fileChangedLabelBrandStyle);
        }
        else if (change === '!') {
            return this.props.selected
                ? (0,typestyle__WEBPACK_IMPORTED_MODULE_1__.classes)(_style_FileItemStyle__WEBPACK_IMPORTED_MODULE_2__.fileChangedLabelStyle, _style_FileItemStyle__WEBPACK_IMPORTED_MODULE_2__.fileChangedLabelWarnStyle, _style_FileItemStyle__WEBPACK_IMPORTED_MODULE_2__.selectedFileChangedLabelStyle)
                : (0,typestyle__WEBPACK_IMPORTED_MODULE_1__.classes)(_style_FileItemStyle__WEBPACK_IMPORTED_MODULE_2__.fileChangedLabelStyle, _style_FileItemStyle__WEBPACK_IMPORTED_MODULE_2__.fileChangedLabelWarnStyle);
        }
        else {
            return this.props.selected
                ? (0,typestyle__WEBPACK_IMPORTED_MODULE_1__.classes)(_style_FileItemStyle__WEBPACK_IMPORTED_MODULE_2__.fileChangedLabelStyle, _style_FileItemStyle__WEBPACK_IMPORTED_MODULE_2__.fileChangedLabelInfoStyle, _style_FileItemStyle__WEBPACK_IMPORTED_MODULE_2__.selectedFileChangedLabelStyle)
                : (0,typestyle__WEBPACK_IMPORTED_MODULE_1__.classes)(_style_FileItemStyle__WEBPACK_IMPORTED_MODULE_2__.fileChangedLabelStyle, _style_FileItemStyle__WEBPACK_IMPORTED_MODULE_2__.fileChangedLabelInfoStyle);
        }
    }
    _getFileClass() {
        const baseClass = this.props.selected
            ? (0,typestyle__WEBPACK_IMPORTED_MODULE_1__.classes)(_style_FileItemStyle__WEBPACK_IMPORTED_MODULE_2__.fileStyle, _style_FileItemStyle__WEBPACK_IMPORTED_MODULE_2__.selectedFileStyle)
            : _style_FileItemStyle__WEBPACK_IMPORTED_MODULE_2__.fileStyle;
        return this.props.className
            ? `${baseClass} ${this.props.className}`
            : baseClass;
    }
    render() {
        var _a;
        const { file } = this.props;
        const status_code = file.status === 'staged' ? file.x : file.y;
        const status = file.status === 'unmerged'
            ? this.props.trans.__('Conflicted')
            : this._getFileChangedLabel(status_code, this.props.trans);
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { "data-test-selected": this.props.selected, "data-test-checked": this.props.checked, className: this._getFileClass(), onClick: this._onClick, onContextMenu: this.props.contextMenu &&
                (event => {
                    this.props.contextMenu(this.props.file, event);
                }), onDoubleClick: this.props.onDoubleClick, style: this.props.style, title: this.props.trans.__(`%1 • ${status}`, this.props.file.to) },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _style_FileItemStyle__WEBPACK_IMPORTED_MODULE_2__.checkboxLabelContainerStyle },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _style_FileItemStyle__WEBPACK_IMPORTED_MODULE_2__.checkboxLabelStyle + ' ' + _style_FilePathStyle__WEBPACK_IMPORTED_MODULE_3__.fileLabelStyle },
                    this.props.markBox && (react__WEBPACK_IMPORTED_MODULE_0__.createElement(GitMarkBox, { fname: this.props.file.to, stage: this.props.file.status, model: this.props.model, checked: (_a = this.props.checked) !== null && _a !== void 0 ? _a : false })),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement(_FilePath__WEBPACK_IMPORTED_MODULE_4__.FilePath, { filepath: this.props.file.to, filetype: this.props.file.type })),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _style_FileItemStyle__WEBPACK_IMPORTED_MODULE_2__.checkboxLabelLastContainerStyle },
                    this.props.actions,
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", { className: this._getFileChangedLabelClass(this.props.file.status === 'unmerged' ? '!' : this.props.file.y) }, this.props.file.status === 'unmerged'
                        ? '!'
                        : this.props.file.y === '?'
                            ? 'U'
                            : status_code)))));
    }
}
var Private;
(function (Private) {
    let i18nCodes = null;
    function get_status(code, trans) {
        if (!i18nCodes) {
            // Git status codes https://git-scm.com/docs/git-status
            i18nCodes = {
                M: trans.__('Modified'),
                A: trans.__('Added'),
                D: trans.__('Deleted'),
                R: trans.__('Renamed'),
                C: trans.__('Copied'),
                U: trans.__('Updated'),
                B: trans.__('Behind'),
                '?': trans.__('Untracked'),
                '!': trans.__('Ignored')
            };
        }
        return i18nCodes[code];
    }
    Private.get_status = get_status;
})(Private || (Private = {}));


/***/ }),

/***/ "./lib/components/FileList.js":
/*!************************************!*\
  !*** ./lib/components/FileList.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CONTEXT_COMMANDS: () => (/* binding */ CONTEXT_COMMANDS),
/* harmony export */   FileList: () => (/* binding */ FileList)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_virtualized_auto_sizer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-virtualized-auto-sizer */ "webpack/sharing/consume/default/react-virtualized-auto-sizer/react-virtualized-auto-sizer");
/* harmony import */ var react_virtualized_auto_sizer__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_virtualized_auto_sizer__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _commandsAndMenu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../commandsAndMenu */ "./lib/commandsAndMenu.js");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../model */ "./lib/model.js");
/* harmony import */ var _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../style/ActionButtonStyle */ "./lib/style/ActionButtonStyle.js");
/* harmony import */ var _style_FileListStyle__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../style/FileListStyle */ "./lib/style/FileListStyle.js");
/* harmony import */ var _style_icons__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../style/icons */ "./lib/style/icons.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../tokens */ "./lib/tokens.js");
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ActionButton */ "./lib/components/ActionButton.js");
/* harmony import */ var _FileItem__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./FileItem */ "./lib/components/FileItem.js");
/* harmony import */ var _GitStage__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./GitStage */ "./lib/components/GitStage.js");
/* harmony import */ var _widgets_discardAllChanges__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../widgets/discardAllChanges */ "./lib/widgets/discardAllChanges.js");
/* harmony import */ var _SelectAllButton__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./SelectAllButton */ "./lib/components/SelectAllButton.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../utils */ "./lib/utils.js");

















const CONTEXT_COMMANDS = {
    'partially-staged': [
        _tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileOpen,
        _tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileUnstage,
        _tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileDiff,
        _tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileHistory
    ],
    'remote-changed': [_tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileOpen],
    unstaged: [
        _tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileOpen,
        _tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileStage,
        _tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileDiscard,
        _tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileDiff,
        _tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileHistory
    ],
    untracked: [
        _tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileOpen,
        _tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileTrack,
        _tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitIgnore,
        _tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitIgnoreExtension,
        _tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileDelete
    ],
    staged: [
        _tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileOpen,
        _tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileUnstage,
        _tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileDiff,
        _tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitCommitAmendStaged,
        _tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileHistory
    ],
    unmodified: [_tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileHistory],
    unmerged: [_tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileDiff],
    stashed: [_tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileStashPop]
};
const SIMPLE_CONTEXT_COMMANDS = {
    'partially-staged': [
        _tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileOpen,
        _tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileDiscard,
        _tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileDiff,
        _tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileHistory
    ],
    'remote-changed': [_tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileOpen],
    staged: [
        _tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileOpen,
        _tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileDiscard,
        _tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileDiff,
        _tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileHistory
    ],
    unstaged: [
        _tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileOpen,
        _tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileDiscard,
        _tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileDiff,
        _tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileHistory
    ],
    untracked: [
        _tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileOpen,
        _tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitIgnore,
        _tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitIgnoreExtension,
        _tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileDelete
    ],
    unmodified: [_tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileHistory],
    unmerged: [_tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileDiff],
    stashed: [_tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileStashPop]
};
/**
 * Compare fileA and fileB.
 * @param fileA
 * @param fileB
 * @returns true if fileA and fileB are equal, otherwise, false.
 */
const areFilesEqual = (fileA, fileB) => {
    return (fileA.x === fileB.x &&
        fileA.y === fileB.y &&
        fileA.from === fileB.from &&
        fileA.to === fileB.to &&
        fileA.status === fileB.status);
};
class FileList extends react__WEBPACK_IMPORTED_MODULE_3__.Component {
    constructor(props) {
        super(props);
        /**
         * Open the context menu on the advanced view
         *
         * @param selectedFile The file on which the context menu is opened
         * @param event The click event
         */
        this.openContextMenu = (selectedFile, event) => {
            event.preventDefault();
            let selectedFiles;
            if (!this._isSelectedFile(selectedFile)) {
                this._selectOnlyOneFile(selectedFile);
                selectedFiles = [selectedFile];
            }
            else {
                selectedFiles = this.state.selectedFiles;
            }
            const contextMenu = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_1__.Menu({ commands: this.props.commands });
            // @ts-expect-error unproper index
            const commands = CONTEXT_COMMANDS[selectedFiles[0].status];
            (0,_commandsAndMenu__WEBPACK_IMPORTED_MODULE_6__.addMenuItems)(commands, contextMenu, selectedFiles);
            contextMenu.open(event.clientX, event.clientY);
        };
        /**
         * Open the context menu on the simple view
         *
         * @param selectedFile The file on which the context menu is opened
         * @param event The click event
         */
        this.openSimpleContextMenu = (selectedFile, event) => {
            event.preventDefault();
            const contextMenu = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_1__.Menu({ commands: this.props.commands });
            // @ts-expect-error unproper index
            const commands = SIMPLE_CONTEXT_COMMANDS[selectedFile.status];
            (0,_commandsAndMenu__WEBPACK_IMPORTED_MODULE_6__.addMenuItems)(commands, contextMenu, [selectedFile]);
            contextMenu.open(event.clientX, event.clientY);
        };
        /** Reset all staged files */
        this.resetAllStagedFiles = async (event) => {
            event === null || event === void 0 ? void 0 : event.stopPropagation();
            await this.props.model.reset();
        };
        /** Reset staged selected files */
        this.resetSelectedFiles = (file) => {
            if (this._isSelectedFile(file)) {
                this.state.selectedFiles.forEach(file => this.props.model.reset(file.to));
            }
            else {
                this.props.model.reset(file.to);
            }
        };
        /** If the clicked file is selected, open all selected files.
         * If the clicked file is not selected, open the clicked file only.
         */
        this.openSelectedFiles = (clickedFile) => {
            if (this._isSelectedFile(clickedFile)) {
                this.props.commands.execute(_tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileOpen, {
                    files: this.state.selectedFiles
                });
            }
            else {
                this.props.commands.execute(_tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileOpen, {
                    files: [clickedFile]
                });
            }
        };
        /** Add all unstaged files */
        this.addAllUnstagedFiles = async (event) => {
            event === null || event === void 0 ? void 0 : event.stopPropagation();
            await this.props.model.addAllUnstaged();
        };
        /** Discard changes in all unstaged files */
        this.discardAllUnstagedFiles = async (event) => {
            event === null || event === void 0 ? void 0 : event.stopPropagation();
            const result = await (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                title: this.props.trans.__('Discard all changes'),
                body: this.props.trans.__('Are you sure you want to permanently discard changes to all unstaged files? This action cannot be undone.'),
                buttons: [
                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.cancelButton({ label: this.props.trans.__('Cancel') }),
                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.warnButton({ label: this.props.trans.__('Discard') })
                ]
            });
            if (result.button.accept) {
                try {
                    await this.props.model.checkout();
                }
                catch (reason) {
                    (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)(this.props.trans.__('Discard all unstaged changes failed.'), reason);
                }
            }
        };
        /** Discard changes in all unstaged and staged files */
        this.discardAllChanges = async (event) => {
            event === null || event === void 0 ? void 0 : event.stopPropagation();
            await (0,_widgets_discardAllChanges__WEBPACK_IMPORTED_MODULE_7__.discardAllChanges)(this.props.model, this.props.trans);
        };
        /** Add a specific unstaged file */
        this.addFile = async (...file) => {
            await this.props.model.add(...file);
        };
        /** Discard changes in a specific unstaged or staged file */
        this.discardChanges = (file) => {
            if (this._isSelectedFile(file)) {
                this.props.commands.execute(_tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileDiscard, {
                    files: this.state.selectedFiles
                });
            }
            else {
                this.props.commands.execute(_tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileDiscard, {
                    files: [file]
                });
            }
        };
        /** Add all untracked files */
        this.addAllUntrackedFiles = async (event) => {
            event === null || event === void 0 ? void 0 : event.stopPropagation();
            await this.props.model.addAllUntracked();
        };
        this.addAllMarkedFiles = async () => {
            await this.addFile(...this.markedFiles.map(file => file.to));
        };
        /**
         * Select files into state.selectedFiles
         * @param file The current cliced-on file
         * @param options Selection options
         */
        this.setSelection = (file, options) => {
            if (options && options.singleton) {
                this._selectOnlyOneFile(file);
            }
            if (options && options.group) {
                this._selectUntilFile(file);
            }
            if (!options) {
                this._toggleFile(file);
            }
        };
        /**
         * Mark files from the latest selected to this one
         *
         * @param file The current clicked-on file
         */
        this.markUntilFile = (file) => {
            if (!this.state.lastClickedFile) {
                this.props.model.setMark(file.to, true);
                return;
            }
            const filesWithMarkBox = this.props.files.filter(fileStatus => !['unmerged', 'remote-changed'].includes(fileStatus.status));
            const lastClickedFileIndex = filesWithMarkBox.findIndex(fileStatus => {
                var _a;
                return areFilesEqual(fileStatus, (_a = this.state.lastClickedFile) !== null && _a !== void 0 ? _a : {});
            });
            const currentFileIndex = filesWithMarkBox.findIndex(fileStatus => areFilesEqual(fileStatus, file));
            if (currentFileIndex > lastClickedFileIndex) {
                const filesToAdd = filesWithMarkBox.slice(lastClickedFileIndex, currentFileIndex + 1);
                filesToAdd.forEach(f => this.props.model.setMark(f.to, true));
            }
            else {
                const filesToAdd = filesWithMarkBox.slice(currentFileIndex, lastClickedFileIndex + 1);
                filesToAdd.forEach(f => this.props.model.setMark(f.to, true));
            }
        };
        /**
         * Set mark status from select-all button
         *
         * @param files Files to toggle
         */
        this.toggleAllFiles = (files) => {
            const areFilesAllMarked = this._areFilesAllMarked();
            files.forEach(f => this.props.model.setMark(f.to, !areFilesAllMarked));
        };
        this._selectOnlyOneFile = (file) => {
            this.setState({
                selectedFiles: [file],
                lastClickedFile: file
            });
        };
        /**
         * Toggle selection status of a file
         * @param file The clicked file
         */
        this._toggleFile = (file) => {
            var _a;
            if (file.status !== ((_a = this.state.lastClickedFile) === null || _a === void 0 ? void 0 : _a.status)) {
                this._selectOnlyOneFile(file);
                return;
            }
            const fileStatus = this.state.selectedFiles.find(fileStatus => areFilesEqual(fileStatus, file));
            if (!fileStatus) {
                this.setState({
                    selectedFiles: [...this.state.selectedFiles, file],
                    lastClickedFile: file
                });
            }
            else {
                this.setState({
                    selectedFiles: this.state.selectedFiles.filter(fileStatus => !areFilesEqual(fileStatus, file)),
                    lastClickedFile: file
                });
            }
        };
        /**
         * Select a list of files
         * @param files List of files to select
         */
        this._selectFiles = (files) => {
            this.setState(prevState => {
                return {
                    selectedFiles: [
                        ...prevState.selectedFiles,
                        ...files.filter(file => !prevState.selectedFiles.some(f => areFilesEqual(f, file)))
                    ]
                };
            });
        };
        /**
         * Deselect a list of file
         * @param files List of file to deselect
         */
        this._deselectFiles = (files) => {
            this.setState(prevState => {
                return {
                    selectedFiles: prevState.selectedFiles.filter(selectedFile => !files.some(file => areFilesEqual(selectedFile, file)))
                };
            });
        };
        /**
         * Handle shift-click behaviour for file selection
         * @param file The shift-clicked file
         */
        this._selectUntilFile = (file) => {
            if (!this.state.lastClickedFile ||
                file.status !== this.state.lastClickedFile.status) {
                this._selectOnlyOneFile(file);
                return;
            }
            const selectedFileStatus = this.state.lastClickedFile.status;
            const allFilesWithSelectedStatus = this.props.files.filter(fileStatus => fileStatus.status === selectedFileStatus);
            const partiallyStagedFiles = this.props.files.filter(fileStatus => fileStatus.status === 'partially-staged');
            switch (selectedFileStatus) {
                case 'staged':
                    allFilesWithSelectedStatus.push(...partiallyStagedFiles.map(fileStatus => ({
                        ...fileStatus,
                        status: 'staged'
                    })));
                    break;
                case 'unstaged':
                    allFilesWithSelectedStatus.push(...partiallyStagedFiles.map(fileStatus => ({
                        ...fileStatus,
                        status: 'unstaged'
                    })));
                    break;
            }
            allFilesWithSelectedStatus.sort((a, b) => a.to.localeCompare(b.to));
            const lastClickedFileIndex = allFilesWithSelectedStatus.findIndex(fileStatus => {
                var _a;
                return areFilesEqual(fileStatus, (_a = this.state.lastClickedFile) !== null && _a !== void 0 ? _a : {});
            });
            const currentFileIndex = allFilesWithSelectedStatus.findIndex(fileStatus => areFilesEqual(fileStatus, file));
            if (currentFileIndex > lastClickedFileIndex) {
                const highestSelectedIndex = allFilesWithSelectedStatus.findIndex((file, index) => index > lastClickedFileIndex && !this._isSelectedFile(file));
                if (highestSelectedIndex === -1) {
                    this._deselectFiles(allFilesWithSelectedStatus.slice(currentFileIndex + 1));
                }
                else if (currentFileIndex < highestSelectedIndex) {
                    this._deselectFiles(allFilesWithSelectedStatus.slice(currentFileIndex + 1, highestSelectedIndex));
                }
                else {
                    this._selectFiles(allFilesWithSelectedStatus.slice(highestSelectedIndex, currentFileIndex + 1));
                }
            }
            else if (currentFileIndex < lastClickedFileIndex) {
                const lowestSelectedIndex = allFilesWithSelectedStatus.findIndex((file, index) => index < lastClickedFileIndex && this._isSelectedFile(file));
                if (lowestSelectedIndex === -1) {
                    this._selectFiles(allFilesWithSelectedStatus.slice(currentFileIndex, lastClickedFileIndex));
                }
                else if (currentFileIndex < lowestSelectedIndex) {
                    this._selectFiles(allFilesWithSelectedStatus.slice(currentFileIndex, lowestSelectedIndex));
                }
                else {
                    this._deselectFiles(allFilesWithSelectedStatus.slice(lowestSelectedIndex, currentFileIndex));
                }
            }
            else {
                this._selectOnlyOneFile(file);
            }
        };
        this.pullFromRemote = async (event) => {
            await this.props.commands.execute(_tokens__WEBPACK_IMPORTED_MODULE_5__.CommandIDs.gitPull, {});
        };
        /**
         * Render an unmerged file
         *
         * Note: This is actually a React.FunctionComponent but defined as
         * a private method as it needs access to FileList properties.
         *
         * @param rowProps Row properties
         */
        this._renderUnmergedRow = (rowProps) => {
            const { data, index, style } = rowProps;
            const file = data[index];
            const diffButton = this._createDiffButton(file);
            return (react__WEBPACK_IMPORTED_MODULE_3__.createElement(_FileItem__WEBPACK_IMPORTED_MODULE_8__.FileItem, { trans: this.props.trans, actions: !file.is_binary ? diffButton : null, contextMenu: this.openContextMenu, file: file, model: this.props.model, selected: this._isSelectedFile(file), setSelection: this.setSelection, onDoubleClick: () => this._openDiffViews([file]), style: { ...style } }));
        };
        /**
         * Render a staged file
         *
         * Note: This is actually a React.FunctionComponent but defined as
         * a private method as it needs access to FileList properties.
         *
         * @param rowProps Row properties
         */
        this._renderStagedRow = (rowProps) => {
            const doubleClickDiff = this.props.settings.get('doubleClickDiff')
                .composite;
            const { data, index, style } = rowProps;
            const file = data[index];
            const diffButton = this._createDiffButton(file);
            return (react__WEBPACK_IMPORTED_MODULE_3__.createElement(_FileItem__WEBPACK_IMPORTED_MODULE_8__.FileItem, { trans: this.props.trans, actions: react__WEBPACK_IMPORTED_MODULE_3__.createElement(react__WEBPACK_IMPORTED_MODULE_3__.Fragment, null,
                    react__WEBPACK_IMPORTED_MODULE_3__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_9__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_10__.hiddenButtonStyle, icon: _style_icons__WEBPACK_IMPORTED_MODULE_11__.openIcon, title: this.props.trans.__('Open this file'), onClick: (0,_utils__WEBPACK_IMPORTED_MODULE_12__.stopPropagationWrapper)(() => this.openSelectedFiles(file)) }),
                    diffButton,
                    react__WEBPACK_IMPORTED_MODULE_3__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_9__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_10__.hiddenButtonStyle, icon: _style_icons__WEBPACK_IMPORTED_MODULE_11__.removeIcon, title: this.props.trans.__('Unstage this change'), onClick: (0,_utils__WEBPACK_IMPORTED_MODULE_12__.stopPropagationWrapper)(() => {
                            this.resetSelectedFiles(file);
                        }) })), file: file, contextMenu: this.openContextMenu, model: this.props.model, selected: this._isSelectedFile(file), setSelection: this.setSelection, onDoubleClick: doubleClickDiff
                    ? diffButton
                        ? () => this._openDiffViews([file])
                        : () => undefined
                    : () => this.openSelectedFiles(file), style: style }));
        };
        /**
         * Render a changed file
         *
         * Note: This is actually a React.FunctionComponent but defined as
         * a private method as it needs access to FileList properties.
         *
         * @param rowProps Row properties
         */
        this._renderChangedRow = (rowProps) => {
            const doubleClickDiff = this.props.settings.get('doubleClickDiff')
                .composite;
            const { data, index, style } = rowProps;
            const file = data[index];
            const diffButton = this._createDiffButton(file);
            return (react__WEBPACK_IMPORTED_MODULE_3__.createElement(_FileItem__WEBPACK_IMPORTED_MODULE_8__.FileItem, { trans: this.props.trans, actions: react__WEBPACK_IMPORTED_MODULE_3__.createElement(react__WEBPACK_IMPORTED_MODULE_3__.Fragment, null,
                    react__WEBPACK_IMPORTED_MODULE_3__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_9__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_10__.hiddenButtonStyle, icon: _style_icons__WEBPACK_IMPORTED_MODULE_11__.openIcon, title: this.props.trans.__('Open this file'), onClick: (0,_utils__WEBPACK_IMPORTED_MODULE_12__.stopPropagationWrapper)(() => this.openSelectedFiles(file)) }),
                    diffButton,
                    react__WEBPACK_IMPORTED_MODULE_3__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_9__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_10__.hiddenButtonStyle, icon: _style_icons__WEBPACK_IMPORTED_MODULE_11__.discardIcon, title: this.props.trans.__('Discard changes'), onClick: (0,_utils__WEBPACK_IMPORTED_MODULE_12__.stopPropagationWrapper)(() => {
                            this.discardChanges(file);
                        }) }),
                    react__WEBPACK_IMPORTED_MODULE_3__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_9__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_10__.hiddenButtonStyle, icon: _style_icons__WEBPACK_IMPORTED_MODULE_11__.addIcon, title: this.props.trans.__('Stage this change'), onClick: (0,_utils__WEBPACK_IMPORTED_MODULE_12__.stopPropagationWrapper)(() => {
                            if (this._isSelectedFile(file)) {
                                this.addFile(...this.state.selectedFiles.map(selectedFile => selectedFile.to));
                            }
                            else {
                                this.addFile(file.to);
                            }
                        }) })), file: file, contextMenu: this.openContextMenu, model: this.props.model, selected: this._isSelectedFile(file), setSelection: this.setSelection, onDoubleClick: doubleClickDiff
                    ? diffButton
                        ? () => this._openDiffViews([file])
                        : () => undefined
                    : () => this.openSelectedFiles(file), style: style }));
        };
        /**
         * Render a untracked file.
         *
         * Note: This is actually a React.FunctionComponent but defined as
         * a private method as it needs access to FileList properties.
         *
         * @param rowProps Row properties
         */
        this._renderUntrackedRow = (rowProps) => {
            const doubleClickDiff = this.props.settings.get('doubleClickDiff')
                .composite;
            const { data, index, style } = rowProps;
            const file = data[index];
            return (react__WEBPACK_IMPORTED_MODULE_3__.createElement(_FileItem__WEBPACK_IMPORTED_MODULE_8__.FileItem, { trans: this.props.trans, actions: react__WEBPACK_IMPORTED_MODULE_3__.createElement(react__WEBPACK_IMPORTED_MODULE_3__.Fragment, null,
                    react__WEBPACK_IMPORTED_MODULE_3__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_9__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_10__.hiddenButtonStyle, icon: _style_icons__WEBPACK_IMPORTED_MODULE_11__.openIcon, title: this.props.trans.__('Open this file'), onClick: (0,_utils__WEBPACK_IMPORTED_MODULE_12__.stopPropagationWrapper)(() => this.openSelectedFiles(file)) }),
                    react__WEBPACK_IMPORTED_MODULE_3__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_9__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_10__.hiddenButtonStyle, icon: _style_icons__WEBPACK_IMPORTED_MODULE_11__.addIcon, title: this.props.trans.__('Track this file'), onClick: (0,_utils__WEBPACK_IMPORTED_MODULE_12__.stopPropagationWrapper)(() => {
                            if (this._isSelectedFile(file)) {
                                this.addFile(...this.state.selectedFiles.map(selectedFile => selectedFile.to));
                            }
                            else {
                                this.addFile(file.to);
                            }
                        }) })), file: file, contextMenu: this.openContextMenu, model: this.props.model, onDoubleClick: () => {
                    if (!doubleClickDiff) {
                        this.props.commands.execute(_tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileOpen, {
                            files: [file]
                        });
                    }
                }, selected: this._isSelectedFile(file), setSelection: this.setSelection, style: style }));
        };
        /**
         * Render the remote changed list.
         *
         * Note: This is actually a React.FunctionComponent but defined as
         * a private method as it needs access to FileList properties.
         *
         * @param rowProps Row properties
         */
        this._renderRemoteChangedRow = (rowProps) => {
            const doubleClickDiff = this.props.settings.get('doubleClickDiff')
                .composite;
            const { data, index, style } = rowProps;
            const file = data[index];
            return (react__WEBPACK_IMPORTED_MODULE_3__.createElement(_FileItem__WEBPACK_IMPORTED_MODULE_8__.FileItem, { trans: this.props.trans, actions: react__WEBPACK_IMPORTED_MODULE_3__.createElement(react__WEBPACK_IMPORTED_MODULE_3__.Fragment, null,
                    react__WEBPACK_IMPORTED_MODULE_3__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_9__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_10__.hiddenButtonStyle, icon: _style_icons__WEBPACK_IMPORTED_MODULE_11__.openIcon, title: this.props.trans.__('Open this file'), onClick: (0,_utils__WEBPACK_IMPORTED_MODULE_12__.stopPropagationWrapper)(() => this.openSelectedFiles(file)) })), file: file, contextMenu: this.openContextMenu, model: this.props.model, onDoubleClick: () => {
                    if (!doubleClickDiff) {
                        this.props.commands.execute(_tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileOpen, {
                            files: [file]
                        });
                    }
                }, selected: this._isSelectedFile(file), setSelection: this.setSelection, style: style }));
        };
        /**
         * Render a modified file in simple mode.
         *
         * Note: This is actually a React.FunctionComponent but defined as
         * a private method as it needs access to FileList properties.
         *
         * @param rowProps Row properties
         */
        this._renderSimpleStageRow = (rowProps) => {
            const { data, index, style } = rowProps;
            const file = data[index];
            const doubleClickDiff = this.props.settings.get('doubleClickDiff')
                .composite;
            const openFile = () => {
                this.props.commands.execute(_tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileOpen, {
                    files: [file]
                });
            };
            // Default value for actions and double click
            let actions = (react__WEBPACK_IMPORTED_MODULE_3__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_9__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_10__.hiddenButtonStyle, icon: _style_icons__WEBPACK_IMPORTED_MODULE_11__.openIcon, title: this.props.trans.__('Open this file'), onClick: (0,_utils__WEBPACK_IMPORTED_MODULE_12__.stopPropagationWrapper)(openFile) }));
            let onDoubleClick = doubleClickDiff ? () => undefined : openFile;
            if (file.status === 'unstaged' || file.status === 'partially-staged') {
                const diffButton = this._createDiffButton(file);
                actions = (react__WEBPACK_IMPORTED_MODULE_3__.createElement(react__WEBPACK_IMPORTED_MODULE_3__.Fragment, null,
                    react__WEBPACK_IMPORTED_MODULE_3__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_9__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_10__.hiddenButtonStyle, icon: _style_icons__WEBPACK_IMPORTED_MODULE_11__.openIcon, title: this.props.trans.__('Open this file'), onClick: (0,_utils__WEBPACK_IMPORTED_MODULE_12__.stopPropagationWrapper)(openFile) }),
                    diffButton,
                    react__WEBPACK_IMPORTED_MODULE_3__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_9__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_10__.hiddenButtonStyle, icon: _style_icons__WEBPACK_IMPORTED_MODULE_11__.discardIcon, title: this.props.trans.__('Discard changes'), onClick: (0,_utils__WEBPACK_IMPORTED_MODULE_12__.stopPropagationWrapper)(() => {
                            this.discardChanges(file);
                        }) })));
                onDoubleClick = doubleClickDiff
                    ? diffButton
                        ? () => this._openDiffViews([file])
                        : () => undefined
                    : openFile;
            }
            else if (file.status === 'staged') {
                const diffButton = this._createDiffButton(file);
                actions = (react__WEBPACK_IMPORTED_MODULE_3__.createElement(react__WEBPACK_IMPORTED_MODULE_3__.Fragment, null,
                    react__WEBPACK_IMPORTED_MODULE_3__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_9__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_10__.hiddenButtonStyle, icon: _style_icons__WEBPACK_IMPORTED_MODULE_11__.openIcon, title: this.props.trans.__('Open this file'), onClick: (0,_utils__WEBPACK_IMPORTED_MODULE_12__.stopPropagationWrapper)(openFile) }),
                    diffButton,
                    react__WEBPACK_IMPORTED_MODULE_3__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_9__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_10__.hiddenButtonStyle, icon: _style_icons__WEBPACK_IMPORTED_MODULE_11__.discardIcon, title: this.props.trans.__('Discard changes'), onClick: (0,_utils__WEBPACK_IMPORTED_MODULE_12__.stopPropagationWrapper)(() => {
                            this.discardChanges(file);
                        }) })));
                onDoubleClick = doubleClickDiff
                    ? diffButton
                        ? () => this._openDiffViews([file])
                        : () => undefined
                    : openFile;
            }
            const checked = this.markedFiles.some(fileStatus => areFilesEqual(fileStatus, file));
            return (react__WEBPACK_IMPORTED_MODULE_3__.createElement(_FileItem__WEBPACK_IMPORTED_MODULE_8__.FileItem, { trans: this.props.trans, actions: actions, file: file, markBox: true, model: this.props.model, onDoubleClick: onDoubleClick, contextMenu: this.openSimpleContextMenu, setSelection: this.setSelection, style: style, markUntilFile: this.markUntilFile, checked: checked }));
        };
        /**
         * Callback invoked upon clicking a button to stash the dirty files.
         *
         * @param event - event object
         * @returns a promise which resolves upon stashing the latest changes
         */
        this._onStashClick = async () => {
            await this.props.commands.execute(_tokens__WEBPACK_IMPORTED_MODULE_5__.CommandIDs.gitStash);
        };
        this.state = {
            selectedFiles: [],
            lastClickedFile: null,
            markedFiles: props.model.markedFiles
        };
    }
    componentDidMount() {
        const { model } = this.props;
        model.markChanged.connect(() => {
            this.setState({ markedFiles: model.markedFiles });
        }, this);
        model.repositoryChanged.connect(() => {
            this.setState({ markedFiles: model.markedFiles });
        }, this);
    }
    componentWillUnmount() {
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__.Signal.clearData(this);
    }
    get markedFiles() {
        return this.props.model.markedFiles;
    }
    /**
     * Render the modified files
     */
    render() {
        const remoteChangedFiles = [];
        const unmergedFiles = [];
        if (this.props.settings.composite['simpleStaging']) {
            const otherFiles = [];
            this.props.files.forEach(file => {
                switch (file.status) {
                    case 'remote-changed':
                        remoteChangedFiles.push(file);
                        break;
                    case 'unmerged':
                        unmergedFiles.push(file);
                        break;
                    default:
                        otherFiles.push(file);
                        break;
                }
            });
            return (react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { className: _style_FileListStyle__WEBPACK_IMPORTED_MODULE_13__.fileListWrapperClass },
                react__WEBPACK_IMPORTED_MODULE_3__.createElement((react_virtualized_auto_sizer__WEBPACK_IMPORTED_MODULE_4___default()), { disableWidth: true }, ({ height }) => (react__WEBPACK_IMPORTED_MODULE_3__.createElement(react__WEBPACK_IMPORTED_MODULE_3__.Fragment, null,
                    this._renderUnmerged(unmergedFiles, height, false),
                    this._renderRemoteChanged(remoteChangedFiles, height),
                    this._renderSimpleStage(otherFiles, height))))));
        }
        else {
            const stagedFiles = [];
            const unstagedFiles = [];
            const untrackedFiles = [];
            this.props.files.forEach(file => {
                switch (file.status) {
                    case 'staged':
                        stagedFiles.push(file);
                        break;
                    case 'unstaged':
                        unstagedFiles.push(file);
                        break;
                    case 'untracked':
                        untrackedFiles.push(file);
                        break;
                    case 'partially-staged':
                        stagedFiles.push({
                            ...file,
                            status: 'staged'
                        });
                        unstagedFiles.push({
                            ...file,
                            status: 'unstaged'
                        });
                        break;
                    case 'unmerged':
                        unmergedFiles.push(file);
                        break;
                    case 'remote-changed':
                        remoteChangedFiles.push(file);
                        break;
                    default:
                        break;
                }
            });
            return (react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { className: _style_FileListStyle__WEBPACK_IMPORTED_MODULE_13__.fileListWrapperClass, onContextMenu: event => event.preventDefault() },
                react__WEBPACK_IMPORTED_MODULE_3__.createElement((react_virtualized_auto_sizer__WEBPACK_IMPORTED_MODULE_4___default()), { disableWidth: true }, ({ height }) => (react__WEBPACK_IMPORTED_MODULE_3__.createElement(react__WEBPACK_IMPORTED_MODULE_3__.Fragment, null,
                    this._renderUnmerged(unmergedFiles, height),
                    this._renderRemoteChanged(remoteChangedFiles, height),
                    this._renderStaged(stagedFiles, height),
                    this._renderChanged(unstagedFiles, height),
                    this._renderUntracked(untrackedFiles, height))))));
        }
    }
    /**
     * Test if a file is selected
     * @param candidate file to test
     */
    _isSelectedFile(candidate) {
        return this.state.selectedFiles.some(file => areFilesEqual(file, candidate));
    }
    _renderUnmerged(files, height, collapsible = true) {
        // Hide section if no merge conflicts are present
        return files.length > 0 ? (react__WEBPACK_IMPORTED_MODULE_3__.createElement(_GitStage__WEBPACK_IMPORTED_MODULE_14__.GitStage, { collapsible: collapsible, files: files, heading: this.props.trans.__('Conflicted'), height: height, rowRenderer: this._renderUnmergedRow })) : null;
    }
    /**
     * Render the staged files list.
     *
     * @param files The staged files
     * @param height The height of the HTML element
     */
    _renderStaged(files, height) {
        return (react__WEBPACK_IMPORTED_MODULE_3__.createElement(_GitStage__WEBPACK_IMPORTED_MODULE_14__.GitStage, { actions: react__WEBPACK_IMPORTED_MODULE_3__.createElement(react__WEBPACK_IMPORTED_MODULE_3__.Fragment, null,
                react__WEBPACK_IMPORTED_MODULE_3__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_9__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_10__.hiddenButtonStyle, icon: _style_icons__WEBPACK_IMPORTED_MODULE_11__.rewindIcon, onClick: this._onStashClick, title: this.props.trans.__('Stash latest changes') }),
                react__WEBPACK_IMPORTED_MODULE_3__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_9__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_10__.hiddenButtonStyle, disabled: files.length === 0, icon: _style_icons__WEBPACK_IMPORTED_MODULE_11__.removeIcon, title: this.props.trans.__('Unstage all changes'), onClick: this.resetAllStagedFiles })), collapsible: true, files: files, heading: this.props.trans.__('Staged'), height: height, rowRenderer: this._renderStagedRow }));
    }
    /**
     * Render the changed files list
     *
     * @param files Changed files
     * @param height Height of the HTML element
     */
    _renderChanged(files, height) {
        const disabled = files.length === 0;
        return (react__WEBPACK_IMPORTED_MODULE_3__.createElement(_GitStage__WEBPACK_IMPORTED_MODULE_14__.GitStage, { actions: react__WEBPACK_IMPORTED_MODULE_3__.createElement(react__WEBPACK_IMPORTED_MODULE_3__.Fragment, null,
                react__WEBPACK_IMPORTED_MODULE_3__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_9__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_10__.hiddenButtonStyle, icon: _style_icons__WEBPACK_IMPORTED_MODULE_11__.rewindIcon, onClick: this._onStashClick, title: this.props.trans.__('Stash latest changes') }),
                react__WEBPACK_IMPORTED_MODULE_3__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_9__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_10__.hiddenButtonStyle, disabled: disabled, icon: _style_icons__WEBPACK_IMPORTED_MODULE_11__.discardIcon, title: this.props.trans.__('Discard All Changes'), onClick: this.discardAllUnstagedFiles }),
                react__WEBPACK_IMPORTED_MODULE_3__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_9__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_10__.hiddenButtonStyle, disabled: disabled, icon: _style_icons__WEBPACK_IMPORTED_MODULE_11__.addIcon, title: this.props.trans.__('Stage all changes'), onClick: this.addAllUnstagedFiles })), collapsible: true, heading: this.props.trans.__('Changed'), height: height, files: files, rowRenderer: this._renderChangedRow }));
    }
    /**
     * Render the untracked files list.
     *
     * @param files Untracked files
     * @param height Height of the HTML element
     */
    _renderUntracked(files, height) {
        return (react__WEBPACK_IMPORTED_MODULE_3__.createElement(_GitStage__WEBPACK_IMPORTED_MODULE_14__.GitStage, { actions: react__WEBPACK_IMPORTED_MODULE_3__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_9__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_10__.hiddenButtonStyle, disabled: files.length === 0, icon: _style_icons__WEBPACK_IMPORTED_MODULE_11__.addIcon, title: this.props.trans.__('Track all untracked files'), onClick: this.addAllUntrackedFiles }), collapsible: true, heading: this.props.trans.__('Untracked'), height: height, files: files, rowRenderer: this._renderUntrackedRow }));
    }
    /**
     * Render the a file that has changed on remote to files list.
     *
     * @param files Untracked files
     * @param height Height of the HTML element
     */
    _renderRemoteChanged(files, height) {
        return (files.length > 0 && (react__WEBPACK_IMPORTED_MODULE_3__.createElement(_GitStage__WEBPACK_IMPORTED_MODULE_14__.GitStage, { actions: react__WEBPACK_IMPORTED_MODULE_3__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_9__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_10__.hiddenButtonStyle, disabled: files.length === 0, icon: _style_icons__WEBPACK_IMPORTED_MODULE_11__.addIcon, title: this.props.trans.__('Pull from remote branch'), onClick: this.pullFromRemote }), collapsible: true, heading: this.props.trans.__('Remote Changes'), height: height, files: files, rowRenderer: this._renderRemoteChangedRow })));
    }
    /**
     * Render the modified files in simple mode.
     *
     * @param files Modified files
     * @param height Height of the HTML element
     */
    _renderSimpleStage(files, height) {
        return (react__WEBPACK_IMPORTED_MODULE_3__.createElement(_GitStage__WEBPACK_IMPORTED_MODULE_14__.GitStage, { selectAllButton: react__WEBPACK_IMPORTED_MODULE_3__.createElement(_SelectAllButton__WEBPACK_IMPORTED_MODULE_15__.SelectAllButton, { onChange: () => {
                    this.toggleAllFiles(files);
                }, checked: this._areFilesAllMarked() }), actions: react__WEBPACK_IMPORTED_MODULE_3__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_9__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_10__.hiddenButtonStyle, disabled: files.length === 0, icon: _style_icons__WEBPACK_IMPORTED_MODULE_11__.discardIcon, title: this.props.trans.__('Discard All Changes'), onClick: this.discardAllChanges }), heading: this.props.trans.__('Changed'), height: height, files: files, rowRenderer: this._renderSimpleStageRow }));
    }
    /**
     * Creates a button element which, depending on the settings, is used
     * to either request a diff of the file, or open the file
     *
     * @param path File path of interest
     * @param currentRef the ref to diff against the git 'HEAD' ref
     */
    _createDiffButton(file) {
        let handleClick;
        if (this.props.settings.composite['simpleStaging']) {
            handleClick = () => this._openDiffViews([file]);
        }
        else {
            handleClick = () => {
                if (this._isSelectedFile(file)) {
                    this._openDiffViews(this.state.selectedFiles);
                }
                else {
                    this._openDiffViews([file]);
                }
            };
        }
        return (((0,_model__WEBPACK_IMPORTED_MODULE_16__.getDiffProvider)(file.to) || !file.is_binary) && (react__WEBPACK_IMPORTED_MODULE_3__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_9__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_10__.hiddenButtonStyle, icon: _style_icons__WEBPACK_IMPORTED_MODULE_11__.diffIcon, title: this.props.trans.__('Diff this file'), onClick: (0,_utils__WEBPACK_IMPORTED_MODULE_12__.stopPropagationWrapper)(handleClick) })));
    }
    /**
     * Returns a callback which opens a diff of the file
     *
     * @param file File to open diff for
     * @param currentRef the ref to diff against the git 'HEAD' ref
     */
    async _openDiffViews(files) {
        try {
            await this.props.commands.execute(_tokens__WEBPACK_IMPORTED_MODULE_5__.ContextCommandIDs.gitFileDiff, {
                files: files.map(file => ({
                    filePath: file.to,
                    isText: !file.is_binary,
                    status: file.status
                }))
            });
        }
        catch (reason) {
            console.error(`Failed to open diff views.\n${reason}`);
        }
    }
    /**
     * Determine if files in simple staging are all marked
     * @returns True if files are all marked
     */
    _areFilesAllMarked() {
        const filesForSimpleStaging = this.props.files.filter(file => !['unmerged', 'remote-changed'].includes(file.status));
        return (filesForSimpleStaging.length !== 0 &&
            filesForSimpleStaging.every(file => this.state.markedFiles.some(mf => areFilesEqual(file, mf))));
    }
}


/***/ }),

/***/ "./lib/components/FilePath.js":
/*!************************************!*\
  !*** ./lib/components/FilePath.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FilePath: () => (/* binding */ FilePath)
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_FilePathStyle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../style/FilePathStyle */ "./lib/style/FilePathStyle.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./lib/utils.js");




const FilePath = (props) => {
    var _a;
    const filename = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.extractFilename)(props.filepath);
    const folder = props.filepath
        .slice(0, props.filepath.length - filename.length)
        .replace(/^\/|\/$/g, ''); // Remove leading and trailing '/'
    const icon = ((_a = props.filetype) === null || _a === void 0 ? void 0 : _a.icon) || _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.fileIcon;
    return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_1__.createElement(icon.react, { className: _style_FilePathStyle__WEBPACK_IMPORTED_MODULE_3__.fileIconStyle, elementPosition: "center", tag: "span" }),
        react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _style_FilePathStyle__WEBPACK_IMPORTED_MODULE_3__.fileLabelStyle },
            filename,
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _style_FilePathStyle__WEBPACK_IMPORTED_MODULE_3__.folderLabelStyle }, folder))));
};


/***/ }),

/***/ "./lib/components/GitCommitGraph.js":
/*!******************************************!*\
  !*** ./lib/components/GitCommitGraph.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GitCommitGraph: () => (/* binding */ GitCommitGraph)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _generateGraphData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../generateGraphData */ "./lib/generateGraphData.js");
/* harmony import */ var _svgPathData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../svgPathData */ "./lib/svgPathData.js");



const COLOURS = [
    '#e11d21',
    '#fbca04',
    '#009800',
    '#006b75',
    '#207de5',
    '#0052cc',
    '#5319e7',
    '#f7c6c7',
    '#fad8c7',
    '#fef2c0',
    '#bfe5bf',
    '#c7def8',
    '#bfdadc',
    '#bfd4f2',
    '#d4c5f9',
    '#cccccc',
    '#84b6eb',
    '#e6e6e6',
    '#cc317c'
];
const DEFAULT_BRANCH_GAP = 10;
const DEFAULT_RADIUS = 3;
const DEFAULT_LINE_WIDTH = 2;
const getColour = function (branch) {
    const n = COLOURS.length;
    return COLOURS[branch % n];
};
const branchCount = (commitNodes) => {
    let maxBranch = -1;
    commitNodes.forEach(node => {
        maxBranch = node.routes.reduce((max, route) => {
            return Math.max(max, route.from, route.to);
        }, maxBranch);
    });
    return maxBranch + 1;
};
class GitCommitGraph extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor(props) {
        super(props);
        this._graphData = [];
        this._x_step = DEFAULT_BRANCH_GAP;
        this._dotRadius = this.props.dotRadius || DEFAULT_RADIUS;
        this._lineWidth = this.props.lineWidth || DEFAULT_LINE_WIDTH;
    }
    getGraphData() {
        this._graphData = (0,_generateGraphData__WEBPACK_IMPORTED_MODULE_1__.generateGraphData)(this.props.commits, this.props.getNodeHeight);
        return this._graphData;
    }
    getBranchCount() {
        return branchCount(this.getGraphData());
    }
    getWidth() {
        return (this.getBranchCount() + 0.5) * this._x_step;
    }
    getHeight() {
        // if this.props.commits.length = 0, just pass 0
        const numCommits = this.props.commits.length;
        const lastNodeHeight = numCommits === 0
            ? 0
            : this.props.getNodeHeight(this.props.commits[numCommits - 1].sha);
        const numGraphNodes = this._graphData.length;
        const lastYOffset = numGraphNodes === 0
            ? 0
            : this._graphData[this._graphData.length - 1].yOffset;
        return lastYOffset + lastNodeHeight;
    }
    renderRouteNode(svgPathDataAttribute, branch) {
        const colour = getColour(branch);
        const style = {
            stroke: colour,
            strokeWidth: this._lineWidth,
            fill: 'none'
        };
        const classes = `commits-graph-branch-${branch}`;
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", { d: svgPathDataAttribute, style: style, className: classes }));
    }
    renderRoute(yOffset, route, height) {
        const { from, to, branch } = route;
        const x_step = this._x_step;
        const svgPath = new _svgPathData__WEBPACK_IMPORTED_MODULE_2__.SVGPathData();
        const from_x = (from + 1) * x_step;
        const from_y = yOffset;
        const to_x = (to + 1) * x_step;
        const to_y = yOffset + height;
        svgPath.moveTo(from_x, from_y);
        if (from_x === to_x) {
            svgPath.lineTo(to_x, to_y);
        }
        else {
            svgPath.bezierCurveTo(from_x - x_step / 4, from_y + height / 2, to_x + x_step / 4, to_y - height / 2, to_x, to_y);
        }
        return this.renderRouteNode(svgPath.toString(), branch);
    }
    renderCommitNode(x, y, sha, dot_branch) {
        const radius = this._dotRadius;
        const colour = getColour(dot_branch);
        const strokeWidth = 1;
        const style = {
            stroke: colour,
            strokeWidth: strokeWidth,
            fill: colour
        };
        const classes = `commits-graph-branch-${dot_branch}`;
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", { cx: x, cy: y, r: radius, style: style, "data-sha": sha, className: classes },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("title", null, sha.slice(0, 7))));
    }
    renderCommit(commit) {
        const { sha, dot, routes, yOffset } = commit;
        const { lateralOffset, branch } = dot;
        // draw dot
        const x = (lateralOffset + 1) * this._x_step;
        const y = yOffset;
        const commitNode = this.renderCommitNode(x, y, sha, branch);
        const routeNodes = routes.map(route => this.renderRoute(commit.yOffset, route, this.props.getNodeHeight(commit.sha)));
        return [commitNode, routeNodes];
    }
    render() {
        // reset lookup table of commit node locations
        const allCommitNodes = [];
        const allRouteNodes = [];
        const commitNodes = this.getGraphData();
        commitNodes.forEach(node => {
            const commit = node;
            const [commitNode, routeNodes] = this.renderCommit(commit);
            allCommitNodes.push(commitNode);
            allRouteNodes.push(...routeNodes);
        });
        const children = [...allRouteNodes, ...allCommitNodes];
        const height = this.getHeight();
        const width = this.getWidth();
        const style = { height, width, flexShrink: 0 };
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", { height: height, width: width, style: style }, ...children));
    }
}


/***/ }),

/***/ "./lib/components/GitPanel.js":
/*!************************************!*\
  !*** ./lib/components/GitPanel.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GitPanel: () => (/* binding */ GitPanel)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_icons_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/icons-material */ "webpack/sharing/consume/default/@mui/icons-material/@mui/icons-material");
/* harmony import */ var _mui_icons_material__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_material_Tab__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/material/Tab */ "./node_modules/@mui/material/Tab/Tab.js");
/* harmony import */ var _mui_material_Tabs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material/Tabs */ "./node_modules/@mui/material/Tabs/Tabs.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _notifications__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../notifications */ "./lib/notifications.js");
/* harmony import */ var _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../style/ActionButtonStyle */ "./lib/style/ActionButtonStyle.js");
/* harmony import */ var _style_GitPanel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../style/GitPanel */ "./lib/style/GitPanel.js");
/* harmony import */ var _style_icons__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../style/icons */ "./lib/style/icons.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../tokens */ "./lib/tokens.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../utils */ "./lib/utils.js");
/* harmony import */ var _widgets_AuthorBox__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../widgets/AuthorBox */ "./lib/widgets/AuthorBox.js");
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./ActionButton */ "./lib/components/ActionButton.js");
/* harmony import */ var _CommitBox__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./CommitBox */ "./lib/components/CommitBox.js");
/* harmony import */ var _CommitComparisonBox__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./CommitComparisonBox */ "./lib/components/CommitComparisonBox.js");
/* harmony import */ var _FileList__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./FileList */ "./lib/components/FileList.js");
/* harmony import */ var _GitStash__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./GitStash */ "./lib/components/GitStash.js");
/* harmony import */ var _HistorySideBar__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./HistorySideBar */ "./lib/components/HistorySideBar.js");
/* harmony import */ var _RebaseAction__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./RebaseAction */ "./lib/components/RebaseAction.js");
/* harmony import */ var _Toolbar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Toolbar */ "./lib/components/Toolbar.js");
/* harmony import */ var _WarningBox__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./WarningBox */ "./lib/components/WarningBox.js");























/**
 * React component for rendering a panel for performing Git operations.
 */
class GitPanel extends react__WEBPACK_IMPORTED_MODULE_4__.Component {
    /**
     * Returns a React component for rendering a panel for performing Git operations.
     *
     * @param props - component properties
     * @returns React component
     */
    constructor(props) {
        super(props);
        this.refreshBranches = async () => {
            this.setState({
                branches: this.props.model.branches
            });
        };
        this.refreshCurrentBranch = async () => {
            const { currentBranch } = this.props.model;
            this.setState({
                currentBranch: currentBranch ? currentBranch.name : 'main',
                referenceCommit: null,
                challengerCommit: null
            });
        };
        this.refreshTags = async () => {
            this.setState({
                tagsList: this.props.model.tagsList
            });
        };
        this.refreshHistory = async () => {
            var _a;
            if (this.props.model.pathRepository !== null) {
                // Get git log for current branch
                const logData = await this.props.model.log(this.props.settings.composite['historyCount']);
                let pastCommits = new Array();
                if (logData.code === 0) {
                    pastCommits = (_a = logData.commits) !== null && _a !== void 0 ? _a : [];
                }
                this.setState({
                    pastCommits: pastCommits
                });
            }
        };
        /**
         * Refresh widget, update all content
         */
        this.refreshView = async () => {
            if (this.props.model.pathRepository !== null) {
                await this.refreshBranches();
                await this.refreshHistory();
                await this.refreshTags();
            }
        };
        /**
         * Commits files.
         *
         * @returns a promise which commits changes
         */
        this.commitFiles = async () => {
            let msg = this.state.commitSummary;
            // Only include description if not empty
            if (this.state.commitDescription) {
                msg = msg + '\n\n' + this.state.commitDescription + '\n';
            }
            if (!msg && !this.state.commitAmend) {
                return;
            }
            const commit = this.props.settings.composite['simpleStaging']
                ? this._commitMarkedFiles
                : this._commitStagedFiles;
            try {
                if (this.state.commitAmend) {
                    await commit(null);
                }
                else {
                    await commit(msg);
                }
                // Only erase commit message upon success
                this.setState({
                    commitSummary: '',
                    commitDescription: ''
                });
            }
            catch (error) {
                console.error(error);
            }
        };
        this._gitStashClear = async () => {
            await this.props.model.dropStash();
        };
        this._gitStashApplyLatest = async () => {
            await this.props.model.applyStash(0);
        };
        /**
         * Callback invoked upon clicking a button to stash the dirty files.
         *
         * @param event - event object
         * @returns a promise which resolves upon stashing the latest changes
         */
        this._onStashClick = async () => {
            await this.props.commands.execute(_tokens__WEBPACK_IMPORTED_MODULE_5__.CommandIDs.gitStash);
        };
        /**
         * Callback invoked upon changing the active panel tab.
         *
         * @param event - event object
         * @param tab - tab number
         */
        this._onTabChange = (event, tab) => {
            if (tab === 1) {
                this.refreshHistory();
            }
            this.setState({
                tab: tab
            });
        };
        /**
         * Updates the commit message description.
         *
         * @param description - commit message description
         */
        this._setCommitDescription = (description) => {
            this.setState({
                commitDescription: description
            });
        };
        /**
         * Updates the commit message summary.
         *
         * @param summary - commit message summary
         */
        this._setCommitSummary = (summary) => {
            this.setState({
                commitSummary: summary
            });
        };
        /**
         * Updates the amend option
         *
         * @param amend - whether the amend is checked
         */
        this._setCommitAmend = (amend) => {
            this.setState({
                commitAmend: amend
            });
        };
        /**
         * Commits all marked files.
         *
         * @param message - commit message
         * @returns a promise which commits the files
         */
        this._commitMarkedFiles = async (message) => {
            const id = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.emit(this.props.trans.__('Staging files...'), 'in-progress', { autoClose: false });
            await this.props.model.reset();
            await this.props.model.add(...this._markedFiles.map(file => file.to));
            await this._commitStagedFiles(message, id);
        };
        /**
         * Commits all staged files.
         *
         * @param message - commit message
         * @returns a promise which commits the files
         */
        this._commitStagedFiles = async (message = null, notificationId) => {
            const errorMsg = this.props.trans.__('Failed to commit changes.');
            let id = notificationId !== null && notificationId !== void 0 ? notificationId : null;
            try {
                const author = await this._hasIdentity(this.props.model.pathRepository);
                const notificationMsg = this.props.trans.__('Committing changes...');
                if (id !== null) {
                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.update({
                        id,
                        message: notificationMsg,
                        autoClose: false
                    });
                }
                else {
                    id = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.emit(notificationMsg, 'in-progress', {
                        autoClose: false
                    });
                }
                if (this.state.commitAmend) {
                    await this.props.model.commit(null, true, author);
                }
                else {
                    await this.props.model.commit(message, false, author);
                }
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.update({
                    id,
                    type: 'success',
                    message: this.props.trans.__('Committed changes.'),
                    autoClose: 5000
                });
                const hasRemote = this.props.model.branches.some(branch => branch.is_remote_branch);
                // If enabled commit and push, push here
                if (this.props.settings.composite['commitAndPush'] && hasRemote) {
                    await this.props.commands.execute(_tokens__WEBPACK_IMPORTED_MODULE_5__.CommandIDs.gitPush);
                }
            }
            catch (error) {
                if (id === null) {
                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.error(errorMsg, (0,_notifications__WEBPACK_IMPORTED_MODULE_6__.showError)(error, this.props.trans));
                }
                else {
                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.update({
                        id,
                        message: errorMsg,
                        ...(0,_notifications__WEBPACK_IMPORTED_MODULE_6__.showError)(error, this.props.trans)
                    });
                }
                throw error;
            }
        };
        this._previousRepoPath = null;
        const { branches, currentBranch, pathRepository, hasDirtyFiles: hasDirtyStagedFiles, stash, tagsList } = props.model;
        this.state = {
            branches: branches,
            currentBranch: currentBranch ? currentBranch.name : 'main',
            files: [],
            remoteChangedFiles: [],
            nCommitsAhead: 0,
            nCommitsBehind: 0,
            pastCommits: [],
            repository: pathRepository,
            tab: 0,
            commitSummary: '',
            commitDescription: '',
            commitAmend: false,
            hasDirtyFiles: hasDirtyStagedFiles,
            referenceCommit: null,
            challengerCommit: null,
            stash: stash,
            tagsList: tagsList
        };
    }
    /**
     * Callback invoked immediately after mounting a component (i.e., inserting into a tree).
     */
    componentDidMount() {
        const { model, settings } = this.props;
        model.stashChanged.connect((_, args) => {
            this.setState({
                stash: args.newValue
            });
        }, this);
        model.repositoryChanged.connect((_, args) => {
            this.setState({
                repository: args.newValue,
                referenceCommit: null,
                challengerCommit: null
            });
            this.refreshView();
        }, this);
        model.statusChanged.connect(async () => {
            const remotechangedFiles = await model.remoteChangedFiles();
            this.setState({
                files: model.status.files,
                remoteChangedFiles: remotechangedFiles,
                nCommitsAhead: model.status.ahead,
                nCommitsBehind: model.status.behind
            });
        }, this);
        model.branchesChanged.connect(async () => {
            await this.refreshBranches();
        }, this);
        model.headChanged.connect(async () => {
            await this.refreshCurrentBranch();
            if (this.state.tab === 1) {
                this.refreshHistory();
            }
        }, this);
        model.tagsChanged.connect(async () => {
            await this.refreshTags();
        }, this);
        model.selectedHistoryFileChanged.connect(() => {
            this.setState({ tab: 1 });
            this.refreshHistory();
        }, this);
        model.remoteChanged.connect((_, args) => {
            this.warningDialog(args);
        }, this);
        settings.changed.connect(this.refreshView, this);
        model.dirtyFilesStatusChanged.connect((_, args) => {
            this.setState({
                hasDirtyFiles: args
            });
        });
    }
    componentWillUnmount() {
        // Clear all signal connections
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__.Signal.clearData(this);
    }
    /**
     * Renders the component.
     *
     * @returns React element
     */
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_4__.createElement("div", { className: _style_GitPanel__WEBPACK_IMPORTED_MODULE_7__.panelWrapperClass }, this.state.repository !== null ? (react__WEBPACK_IMPORTED_MODULE_4__.createElement(react__WEBPACK_IMPORTED_MODULE_4__.Fragment, null,
            this._renderToolbar(),
            this._renderMain())) : (this._renderWarning())));
    }
    /**
     * Renders a toolbar.
     *
     * @returns React element
     */
    _renderToolbar() {
        const disableBranching = Boolean(this.props.settings.composite['disableBranchWithChanges'] &&
            (this._hasUnStagedFile() || this._hasStagedFile()));
        return (react__WEBPACK_IMPORTED_MODULE_4__.createElement(_Toolbar__WEBPACK_IMPORTED_MODULE_8__.Toolbar, { currentBranch: this.state.currentBranch, branches: this.state.branches, tagsList: this.state.tagsList, branching: !disableBranching, commands: this.props.commands, pastCommits: this.state.pastCommits, model: this.props.model, nCommitsAhead: this.state.nCommitsAhead, nCommitsBehind: this.state.nCommitsBehind, repository: this.state.repository || '', trans: this.props.trans }));
    }
    /**
     * Renders the main panel.
     *
     * @returns React element
     */
    _renderMain() {
        return (react__WEBPACK_IMPORTED_MODULE_4__.createElement(react__WEBPACK_IMPORTED_MODULE_4__.Fragment, null,
            this._renderTabs(),
            this.state.tab === 1 ? this._renderHistory() : this._renderChanges()));
    }
    /**
     * Renders panel tabs.
     *
     * @returns React element
     */
    _renderTabs() {
        return (react__WEBPACK_IMPORTED_MODULE_4__.createElement(_mui_material_Tabs__WEBPACK_IMPORTED_MODULE_9__["default"], { classes: {
                root: _style_GitPanel__WEBPACK_IMPORTED_MODULE_7__.tabsClass,
                indicator: _style_GitPanel__WEBPACK_IMPORTED_MODULE_7__.tabIndicatorClass
            }, value: this.state.tab, onChange: this._onTabChange },
            react__WEBPACK_IMPORTED_MODULE_4__.createElement(_mui_material_Tab__WEBPACK_IMPORTED_MODULE_10__["default"], { classes: {
                    root: _style_GitPanel__WEBPACK_IMPORTED_MODULE_7__.tabClass,
                    selected: _style_GitPanel__WEBPACK_IMPORTED_MODULE_7__.selectedTabClass
                }, title: this.props.trans.__('View changed files'), label: this.props.trans.__('Changes'), disableFocusRipple: true, disableRipple: true }),
            react__WEBPACK_IMPORTED_MODULE_4__.createElement(_mui_material_Tab__WEBPACK_IMPORTED_MODULE_10__["default"], { classes: {
                    root: _style_GitPanel__WEBPACK_IMPORTED_MODULE_7__.tabClass,
                    selected: _style_GitPanel__WEBPACK_IMPORTED_MODULE_7__.selectedTabClass
                }, title: this.props.trans.__('View commit history'), label: this.props.trans.__('History'), disableFocusRipple: true, disableRipple: true })));
    }
    /**
     * Renders a panel for viewing and committing file changes.
     *
     * @returns React element
     */
    _renderChanges() {
        var _a, _b;
        const hasRemote = this.props.model.branches.some(branch => branch.is_remote_branch);
        const commitAndPush = this.props.settings.composite['commitAndPush'] && hasRemote;
        const buttonLabel = commitAndPush
            ? this.state.commitAmend
                ? this.props.trans.__('Commit (Amend) and Push')
                : this.props.trans.__('Commit and Push')
            : this.state.commitAmend
                ? this.props.trans.__('Commit (Amend)')
                : this.props.trans.__('Commit');
        const warningTitle = this.props.trans.__('Warning');
        const inSimpleMode = this.props.settings.composite['simpleStaging'];
        const warningContent = inSimpleMode
            ? this.props.trans.__('You have unsaved tracked files. You probably want to save all changes before committing.')
            : this.props.trans.__('You have unsaved staged files. You probably want to save and stage all needed changes before committing.');
        return (react__WEBPACK_IMPORTED_MODULE_4__.createElement(react__WEBPACK_IMPORTED_MODULE_4__.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_4__.createElement(_FileList__WEBPACK_IMPORTED_MODULE_11__.FileList, { files: this._sortedFiles, model: this.props.model, commands: this.props.commands, settings: this.props.settings, trans: this.props.trans }),
            react__WEBPACK_IMPORTED_MODULE_4__.createElement(_GitStash__WEBPACK_IMPORTED_MODULE_12__.GitStash, { actions: react__WEBPACK_IMPORTED_MODULE_4__.createElement(react__WEBPACK_IMPORTED_MODULE_4__.Fragment, null,
                    react__WEBPACK_IMPORTED_MODULE_4__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_13__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_14__.hiddenButtonStyle, icon: _style_icons__WEBPACK_IMPORTED_MODULE_15__.rewindIcon, onClick: this._onStashClick, title: this.props.trans.__('Stash latest changes') }),
                    react__WEBPACK_IMPORTED_MODULE_4__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_13__.ActionButton, { icon: _style_icons__WEBPACK_IMPORTED_MODULE_15__.addIcon, className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_14__.hiddenButtonStyle, disabled: ((_a = this.props.model.stash) === null || _a === void 0 ? void 0 : _a.length) === 0, title: this.props.trans.__('Apply the latest stash'), onClick: (0,_utils__WEBPACK_IMPORTED_MODULE_16__.stopPropagationWrapper)(() => {
                            this._gitStashApplyLatest();
                        }) }),
                    react__WEBPACK_IMPORTED_MODULE_4__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_13__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_14__.hiddenButtonStyle, icon: _style_icons__WEBPACK_IMPORTED_MODULE_15__.trashIcon, title: this.props.trans.__('Clear the entire stash'), disabled: ((_b = this.props.model.stash) === null || _b === void 0 ? void 0 : _b.length) === 0, onClick: (0,_utils__WEBPACK_IMPORTED_MODULE_16__.stopPropagationWrapper)(() => {
                            this._gitStashClear();
                        }) })), stash: this.props.model.stash, model: this.props.model, height: 100, collapsible: true, trans: this.props.trans }),
            this.props.model.status.state !== _tokens__WEBPACK_IMPORTED_MODULE_5__.Git.State.REBASING ? (react__WEBPACK_IMPORTED_MODULE_4__.createElement(_CommitBox__WEBPACK_IMPORTED_MODULE_17__.CommitBox, { commands: this.props.commands, hasFiles: inSimpleMode
                    ? this._markedFiles.length > 0
                    : this._hasStagedFile(), trans: this.props.trans, label: buttonLabel, summary: this.state.commitSummary, description: this.state.commitDescription, amend: this.state.commitAmend, setSummary: this._setCommitSummary, setDescription: this._setCommitDescription, setAmend: this._setCommitAmend, onCommit: this.commitFiles, warning: this.state.hasDirtyFiles ? (react__WEBPACK_IMPORTED_MODULE_4__.createElement(_WarningBox__WEBPACK_IMPORTED_MODULE_18__.WarningBox, { headerIcon: react__WEBPACK_IMPORTED_MODULE_4__.createElement(_mui_icons_material__WEBPACK_IMPORTED_MODULE_3__.WarningRounded, null), title: warningTitle, content: warningContent })) : null })) : (react__WEBPACK_IMPORTED_MODULE_4__.createElement(_RebaseAction__WEBPACK_IMPORTED_MODULE_19__.RebaseAction, { commands: this.props.commands, hasConflict: this.state.files.some(file => file.status === 'unmerged'), trans: this.props.trans }))));
    }
    /**
     * Renders a panel for viewing commit history.
     *
     * @returns React element
     */
    _renderHistory() {
        return (react__WEBPACK_IMPORTED_MODULE_4__.createElement(react__WEBPACK_IMPORTED_MODULE_4__.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_4__.createElement(_HistorySideBar__WEBPACK_IMPORTED_MODULE_20__.HistorySideBar, { branches: this.state.branches, tagsList: this.state.tagsList, commits: this.state.pastCommits, model: this.props.model, commands: this.props.commands, trans: this.props.trans, referenceCommit: this.state.referenceCommit, challengerCommit: this.state.challengerCommit, onSelectForCompare: commit => async (event) => {
                    event === null || event === void 0 ? void 0 : event.stopPropagation();
                    this.setState({ referenceCommit: commit }, () => {
                        this._openSingleFileComparison(event);
                    });
                }, onCompareWithSelected: commit => async (event) => {
                    event === null || event === void 0 ? void 0 : event.stopPropagation();
                    this.setState({ challengerCommit: commit }, () => {
                        this._openSingleFileComparison(event);
                    });
                } }),
            this.props.model.selectedHistoryFile === null &&
                (this.state.referenceCommit || this.state.challengerCommit) && (react__WEBPACK_IMPORTED_MODULE_4__.createElement(_CommitComparisonBox__WEBPACK_IMPORTED_MODULE_21__.CommitComparisonBox, { header: this.props.trans.__('Compare %1 and %2', this.state.referenceCommit
                    ? this.state.referenceCommit.commit.substring(0, 7)
                    : '...', this.state.challengerCommit
                    ? this.state.challengerCommit.commit.substring(0, 7)
                    : '...'), referenceCommit: this.state.referenceCommit, challengerCommit: this.state.challengerCommit, commands: this.props.commands, model: this.props.model, trans: this.props.trans, onClose: event => {
                    event === null || event === void 0 ? void 0 : event.stopPropagation();
                    this.setState({
                        referenceCommit: null,
                        challengerCommit: null
                    });
                }, onOpenDiff: this.state.referenceCommit && this.state.challengerCommit
                    ? (0,_utils__WEBPACK_IMPORTED_MODULE_16__.openFileDiff)(this.props.commands)(this.state.challengerCommit, this.state.referenceCommit)
                    : undefined }))));
    }
    /**
     * Renders a panel for prompting a user to find a Git repository.
     *
     * @returns React element
     */
    _renderWarning() {
        const path = this.props.filebrowser.path;
        const { commands } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_4__.createElement(react__WEBPACK_IMPORTED_MODULE_4__.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_4__.createElement("div", { className: _style_GitPanel__WEBPACK_IMPORTED_MODULE_7__.warningTextClass },
                path ? (react__WEBPACK_IMPORTED_MODULE_4__.createElement(react__WEBPACK_IMPORTED_MODULE_4__.Fragment, null,
                    react__WEBPACK_IMPORTED_MODULE_4__.createElement("b", { title: path }, _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.basename(path)),
                    ' ',
                    this.props.trans.__('is not'))) : (this.props.trans.__('You are not currently in')),
                this.props.trans.__(' a Git repository. To use Git, navigate to a local repository, initialize a repository here, or clone an existing repository.')),
            react__WEBPACK_IMPORTED_MODULE_4__.createElement("button", { className: _style_GitPanel__WEBPACK_IMPORTED_MODULE_7__.repoButtonClass, onClick: () => commands.execute('filebrowser:toggle-main') }, this.props.trans.__('Open the FileBrowser')),
            react__WEBPACK_IMPORTED_MODULE_4__.createElement("button", { className: _style_GitPanel__WEBPACK_IMPORTED_MODULE_7__.repoButtonClass, onClick: () => commands.execute(_tokens__WEBPACK_IMPORTED_MODULE_5__.CommandIDs.gitInit) }, this.props.trans.__('Initialize a Repository')),
            commands.hasCommand(_tokens__WEBPACK_IMPORTED_MODULE_5__.CommandIDs.gitClone) && (react__WEBPACK_IMPORTED_MODULE_4__.createElement("button", { className: _style_GitPanel__WEBPACK_IMPORTED_MODULE_7__.repoButtonClass, onClick: async () => {
                    await commands.execute(_tokens__WEBPACK_IMPORTED_MODULE_5__.CommandIDs.gitClone);
                    await commands.execute('filebrowser:toggle-main');
                } }, this.props.trans.__('Clone a Repository')))));
    }
    /**
     * Determines whether a user has a known Git identity.
     *
     * @param path - repository path
     */
    async _hasIdentity(path) {
        if (!path) {
            return null;
        }
        // If the repository path changes or explicitly configured, check the user identity
        if (path !== this._previousRepoPath ||
            this.props.settings.composite['promptUserIdentity']) {
            try {
                let userOrEmailNotSet = false;
                let author;
                let authorOverride = null;
                if (this.props.model.lastAuthor === null) {
                    const data = (await this.props.model.config());
                    const options = data['options'];
                    author = {
                        name: options['user.name'] || '',
                        email: options['user.email'] || ''
                    };
                    userOrEmailNotSet = !author.name || !author.email;
                }
                else {
                    author = this.props.model.lastAuthor;
                }
                // If explicitly configured or the user name or e-mail is unknown, ask the user to set it
                if (this.props.settings.composite['promptUserIdentity'] ||
                    userOrEmailNotSet) {
                    const result = await (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                        title: this.props.trans.__('Who is committing?'),
                        body: new _widgets_AuthorBox__WEBPACK_IMPORTED_MODULE_22__.GitAuthorForm({ author, trans: this.props.trans })
                    });
                    if (!result.button.accept) {
                        throw new Error(this.props.trans.__('User refused to set identity.'));
                    }
                    author = result.value;
                    if (userOrEmailNotSet) {
                        await this.props.model.config({
                            'user.name': author.name,
                            'user.email': author.email
                        });
                    }
                    this.props.model.lastAuthor = author;
                    if (this.props.settings.composite['promptUserIdentity']) {
                        authorOverride = `${author.name} <${author.email}>`;
                    }
                }
                this._previousRepoPath = path;
                return authorOverride;
            }
            catch (error) {
                if (error instanceof _tokens__WEBPACK_IMPORTED_MODULE_5__.Git.GitResponseError) {
                    throw error;
                }
                throw new Error(
                // @ts-expect-error error will have message attribute
                this.props.trans.__('Failed to set your identity. %1', error.message));
            }
        }
        return null;
    }
    _hasStagedFile() {
        return this.state.files.some(file => file.status === 'staged' || file.status === 'partially-staged');
    }
    _hasUnStagedFile() {
        return this.state.files.some(file => file.status === 'unstaged' || file.status === 'partially-staged');
    }
    /**
     * List of marked files.
     */
    get _markedFiles() {
        return this._sortedFiles.filter(file => this.props.model.getMark(file.to));
    }
    /**
     * List of sorted modified files.
     */
    get _sortedFiles() {
        const { files, remoteChangedFiles } = this.state;
        let sfiles = files;
        if (remoteChangedFiles) {
            sfiles = sfiles.concat(remoteChangedFiles);
        }
        sfiles.sort((a, b) => a.to.localeCompare(b.to));
        return sfiles;
    }
    /**
     * Show a dialog when a notifyRemoteChanges signal is emitted from the model.
     */
    async warningDialog(options) {
        const title = this.props.trans.__('One or more open files are behind %1 head. Do you want to pull the latest remote version?', this.props.model.status.remote);
        const dialog = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog({
            title,
            body: this._renderBody(options.notNotified, options.notified),
            buttons: [
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.cancelButton({
                    label: this.props.trans.__('Continue Without Pulling')
                }),
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.warnButton({
                    label: this.props.trans.__('Pull'),
                    caption: this.props.trans.__('Git Pull from Remote Branch')
                })
            ]
        });
        const result = await dialog.launch();
        if (result.button.accept) {
            await this.props.commands.execute(_tokens__WEBPACK_IMPORTED_MODULE_5__.CommandIDs.gitPull, {});
        }
    }
    /**
     * renders the body to be used in the remote changes warning dialog
     */
    _renderBody(notNotifiedList, notifiedList = []) {
        const listedItems = notNotifiedList.map((item) => {
            console.log(item.to);
            const item_val = this.props.trans.__(item.to);
            return react__WEBPACK_IMPORTED_MODULE_4__.createElement("li", { key: item_val }, item_val);
        });
        let elem = react__WEBPACK_IMPORTED_MODULE_4__.createElement("ul", null, listedItems);
        if (notifiedList.length > 0) {
            const remaining = this.props.trans.__('The following open files remain behind:');
            const alreadyListedItems = notifiedList.map((item) => {
                console.log(item.to);
                const item_val = this.props.trans.__(item.to);
                return react__WEBPACK_IMPORTED_MODULE_4__.createElement("li", { key: item_val }, item_val);
            });
            const full = (react__WEBPACK_IMPORTED_MODULE_4__.createElement("div", null,
                elem,
                remaining,
                react__WEBPACK_IMPORTED_MODULE_4__.createElement("ul", null, alreadyListedItems)));
            elem = full;
        }
        return react__WEBPACK_IMPORTED_MODULE_4__.createElement("div", null, elem);
    }
    /**
     *
     */
    _openSingleFileComparison(event) {
        if (this.props.model.selectedHistoryFile &&
            this.state.referenceCommit &&
            this.state.challengerCommit) {
            (0,_utils__WEBPACK_IMPORTED_MODULE_16__.openFileDiff)(this.props.commands)(this.state.challengerCommit, this.state.referenceCommit)(this.props.model.selectedHistoryFile.to, !this.props.model.selectedHistoryFile.is_binary)(event);
        }
    }
}


/***/ }),

/***/ "./lib/components/GitStage.js":
/*!************************************!*\
  !*** ./lib/components/GitStage.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GitStage: () => (/* binding */ GitStage)
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_window__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-window */ "webpack/sharing/consume/default/react-window/react-window");
/* harmony import */ var react_window__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_window__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_GitStageStyle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../style/GitStageStyle */ "./lib/style/GitStageStyle.js");




const HEADER_HEIGHT = 34;
const ITEM_HEIGHT = 25;
const GitStage = (props) => {
    const [showFiles, setShowFiles] = react__WEBPACK_IMPORTED_MODULE_1__.useState(true);
    const nFiles = props.files.length;
    return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_GitStageStyle__WEBPACK_IMPORTED_MODULE_3__.sectionFileContainerStyle },
        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_GitStageStyle__WEBPACK_IMPORTED_MODULE_3__.sectionAreaStyle, onClick: () => {
                if (props.collapsible && nFiles > 0) {
                    setShowFiles(!showFiles);
                }
            } },
            props.selectAllButton && props.selectAllButton,
            props.collapsible && (react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _style_GitStageStyle__WEBPACK_IMPORTED_MODULE_3__.changeStageButtonStyle }, showFiles && nFiles > 0 ? (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.caretDownIcon.react, { tag: "span" })) : (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.caretRightIcon.react, { tag: "span" })))),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _style_GitStageStyle__WEBPACK_IMPORTED_MODULE_3__.sectionHeaderLabelStyle }, props.heading),
            props.actions,
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _style_GitStageStyle__WEBPACK_IMPORTED_MODULE_3__.sectionHeaderSizeStyle },
                "(",
                nFiles,
                ")")),
        showFiles && nFiles > 0 && (react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_window__WEBPACK_IMPORTED_MODULE_2__.FixedSizeList, { height: Math.max(Math.min(props.height - HEADER_HEIGHT, nFiles * ITEM_HEIGHT), ITEM_HEIGHT), itemCount: nFiles, itemData: props.files, itemKey: (index, data) => data[index].to, itemSize: ITEM_HEIGHT, style: { overflowX: 'hidden' }, width: 'auto' }, props.rowRenderer))));
};


/***/ }),

/***/ "./lib/components/GitStash.js":
/*!************************************!*\
  !*** ./lib/components/GitStash.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GitStash: () => (/* binding */ GitStash)
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_GitStageStyle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../style/GitStageStyle */ "./lib/style/GitStageStyle.js");
/* harmony import */ var _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../style/ActionButtonStyle */ "./lib/style/ActionButtonStyle.js");
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ActionButton */ "./lib/components/ActionButton.js");
/* harmony import */ var _style_icons__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../style/icons */ "./lib/style/icons.js");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_window__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-window */ "webpack/sharing/consume/default/react-window/react-window");
/* harmony import */ var react_window__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_window__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_GitStashStyle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../style/GitStashStyle */ "./lib/style/GitStashStyle.js");
/* harmony import */ var _FilePath__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./FilePath */ "./lib/components/FilePath.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../utils */ "./lib/utils.js");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_4__);












const HEADER_HEIGHT = 34;
const ITEM_HEIGHT = 25;
/**
 * Dropdown for each entry in the stash
 */
const GitStashEntry = (props) => {
    const [showStashFiles, setShowStashFiles] = react__WEBPACK_IMPORTED_MODULE_1__.useState(false);
    const nFiles = props.files.length;
    return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_GitStageStyle__WEBPACK_IMPORTED_MODULE_5__.sectionFileContainerStyle },
        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_GitStageStyle__WEBPACK_IMPORTED_MODULE_5__.sectionAreaStyle, onClick: () => {
                if (props.collapsible && (props === null || props === void 0 ? void 0 : props.files.length) > 0) {
                    setShowStashFiles(!showStashFiles);
                }
            } },
            props.collapsible && (react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _style_GitStageStyle__WEBPACK_IMPORTED_MODULE_5__.changeStageButtonStyle }, showStashFiles && (props === null || props === void 0 ? void 0 : props.files.length) > 0 ? (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.caretDownIcon.react, { tag: "span" })) : (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.caretRightIcon.react, { tag: "span" })))),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _style_GitStashStyle__WEBPACK_IMPORTED_MODULE_6__.sectionHeaderLabelStyle },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _style_GitStashStyle__WEBPACK_IMPORTED_MODULE_6__.stashEntryMessageStyle }, props.trans.__('%1 (on %2)', props.message, props.branch)),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _style_GitStashStyle__WEBPACK_IMPORTED_MODULE_6__.sectionButtonContainerStyle }, props.actions))),
        showStashFiles && (react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_window__WEBPACK_IMPORTED_MODULE_3__.FixedSizeList, { className: _style_GitStashStyle__WEBPACK_IMPORTED_MODULE_6__.listStyle, height: Math.max(Math.min(props.height - HEADER_HEIGHT, nFiles * ITEM_HEIGHT), ITEM_HEIGHT), itemCount: nFiles, innerElementType: "ul", itemData: props === null || props === void 0 ? void 0 : props.files, itemKey: (index, data) => data[index], itemSize: ITEM_HEIGHT, width: 'auto', style: { margin: 0, paddingLeft: 0 } }, ({ index }) => {
            const file = props.files[index];
            return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("li", { className: _style_GitStashStyle__WEBPACK_IMPORTED_MODULE_6__.stashFileStyle },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement(_FilePath__WEBPACK_IMPORTED_MODULE_7__.FilePath, { filepath: file })));
        }))));
};
const GitStash = (props) => {
    var _a, _b;
    const [showStash, setShowStash] = react__WEBPACK_IMPORTED_MODULE_1__.useState(false);
    const [stashIsLoading, setStashIsLoading] = react__WEBPACK_IMPORTED_MODULE_1__.useState(true);
    const nStash = (_b = (_a = props.stash) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
    const gitStashPop = react__WEBPACK_IMPORTED_MODULE_1__.useCallback(async (index) => {
        try {
            await props.model.popStash(index);
        }
        catch (err) {
            console.error(err);
        }
    }, [props.model]);
    const gitStashDrop = react__WEBPACK_IMPORTED_MODULE_1__.useCallback(async (index) => {
        try {
            await props.model.dropStash(index);
        }
        catch (err) {
            console.error(err);
        }
    }, [props.model]);
    const gitStashApply = react__WEBPACK_IMPORTED_MODULE_1__.useCallback(async (index) => {
        try {
            await props.model.applyStash(index);
        }
        catch (err) {
            console.error(err);
        }
    }, [props.model]);
    return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: (0,typestyle__WEBPACK_IMPORTED_MODULE_4__.classes)(_style_GitStageStyle__WEBPACK_IMPORTED_MODULE_5__.sectionFileContainerStyle, _style_GitStashStyle__WEBPACK_IMPORTED_MODULE_6__.stashContainerStyle) },
        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_GitStageStyle__WEBPACK_IMPORTED_MODULE_5__.sectionAreaStyle, onClick: () => {
                if (props.collapsible && nStash > 0) {
                    setShowStash(!showStash);
                }
            } },
            props.selectAllButton && props.selectAllButton,
            props.collapsible && (react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _style_GitStageStyle__WEBPACK_IMPORTED_MODULE_5__.changeStageButtonStyle }, showStash && nStash > 0 ? (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.caretDownIcon.react, { tag: "span" })) : (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.caretRightIcon.react, { tag: "span" })))),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _style_GitStashStyle__WEBPACK_IMPORTED_MODULE_6__.sectionHeaderLabelStyle },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, props.trans.__('Stash')),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _style_GitStashStyle__WEBPACK_IMPORTED_MODULE_6__.sectionButtonContainerStyle },
                    props.actions,
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { "data-test-id": "num-stashes", "data-loading": stashIsLoading ? 'true' : 'false' },
                        "(",
                        nStash,
                        ")")))),
        react__WEBPACK_IMPORTED_MODULE_1__.createElement(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__.UseSignal, { signal: props.model.stashChanged }, () => {
            if (!props.stash || !Array.isArray(props.stash)) {
                return null;
            }
            const nStash = props.stash.length;
            setStashIsLoading(false);
            return (props.model.stashChanged &&
                showStash &&
                nStash > 0 && (react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, props.stash.map(entry => (react__WEBPACK_IMPORTED_MODULE_1__.createElement(GitStashEntry, { key: entry.index, files: entry.files, model: props.model, index: entry.index, branch: entry.branch, trans: props.trans, message: entry.message, height: 100, collapsible: true, actions: react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null,
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_8__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_9__.hiddenButtonStyle, icon: _style_icons__WEBPACK_IMPORTED_MODULE_10__.discardIcon, title: props.trans.__('Pop stash entry'), onClick: (0,_utils__WEBPACK_IMPORTED_MODULE_11__.stopPropagationWrapper)(() => {
                            gitStashPop(entry.index);
                        }) }),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_8__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_9__.hiddenButtonStyle, icon: _style_icons__WEBPACK_IMPORTED_MODULE_10__.addIcon, title: props.trans.__('Apply stash entry'), onClick: (0,_utils__WEBPACK_IMPORTED_MODULE_11__.stopPropagationWrapper)(() => {
                            gitStashApply(entry.index);
                        }) }),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_8__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_9__.hiddenButtonStyle, icon: _style_icons__WEBPACK_IMPORTED_MODULE_10__.trashIcon, title: props.trans.__('Drop stash entry'), onClick: (0,_utils__WEBPACK_IMPORTED_MODULE_11__.stopPropagationWrapper)(() => {
                            gitStashDrop(entry.index);
                        }) })) }))))));
        })));
};


/***/ }),

/***/ "./lib/components/HistorySideBar.js":
/*!******************************************!*\
  !*** ./lib/components/HistorySideBar.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CONTEXT_COMMANDS: () => (/* binding */ CONTEXT_COMMANDS),
/* harmony export */   HistorySideBar: () => (/* binding */ HistorySideBar)
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _commandsAndMenu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../commandsAndMenu */ "./lib/commandsAndMenu.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../style/ActionButtonStyle */ "./lib/style/ActionButtonStyle.js");
/* harmony import */ var _style_HistorySideBarStyle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../style/HistorySideBarStyle */ "./lib/style/HistorySideBarStyle.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tokens */ "./lib/tokens.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils */ "./lib/utils.js");
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ActionButton */ "./lib/components/ActionButton.js");
/* harmony import */ var _FileItem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./FileItem */ "./lib/components/FileItem.js");
/* harmony import */ var _PastCommitNode__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./PastCommitNode */ "./lib/components/PastCommitNode.js");
/* harmony import */ var _SinglePastCommitInfo__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./SinglePastCommitInfo */ "./lib/components/SinglePastCommitInfo.js");
/* harmony import */ var _GitCommitGraph__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./GitCommitGraph */ "./lib/components/GitCommitGraph.js");













const CONTEXT_COMMANDS = [_tokens__WEBPACK_IMPORTED_MODULE_3__.ContextCommandIDs.gitTagAdd];
/**
 * Returns a React component for displaying commit history.
 *
 * @param props - component properties
 * @returns React element
 */
const HistorySideBar = (props) => {
    var _a;
    /**
     * Discards the selected file and shows the full history.
     */
    const removeSelectedFile = () => {
        props.model.selectedHistoryFile = null;
    };
    /**
     * Commit info for 'Uncommitted Changes' history.
     */
    const uncommitted = react__WEBPACK_IMPORTED_MODULE_2__.useMemo(() => {
        var _a, _b, _c;
        return {
            author: props.trans.__('You'),
            commit: `${((_a = props.model.selectedHistoryFile) === null || _a === void 0 ? void 0 : _a.status) === 'staged'
                ? _tokens__WEBPACK_IMPORTED_MODULE_3__.Git.Diff.SpecialRef.INDEX
                : _tokens__WEBPACK_IMPORTED_MODULE_3__.Git.Diff.SpecialRef.WORKING}`,
            pre_commits: ['HEAD'],
            is_binary: (_c = (_b = props.commits[0]) === null || _b === void 0 ? void 0 : _b.is_binary) !== null && _c !== void 0 ? _c : false,
            commit_msg: props.trans.__('Uncommitted Changes'),
            date: props.trans.__('now')
        };
    }, [props.model.selectedHistoryFile]);
    const commits = props.model.selectedHistoryFile &&
        ((_a = props.model.selectedHistoryFile) === null || _a === void 0 ? void 0 : _a.status) !== 'unmodified'
        ? [uncommitted, ...props.commits]
        : props.commits;
    const [expandedCommits, setExpandedCommits] = react__WEBPACK_IMPORTED_MODULE_2__.useState([]);
    const [nodeHeights, setNodeHeights] = react__WEBPACK_IMPORTED_MODULE_2__.useState({});
    const nodes = react__WEBPACK_IMPORTED_MODULE_2__.useRef({});
    react__WEBPACK_IMPORTED_MODULE_2__.useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                const borderBoxSize = Array.isArray(entry.borderBoxSize)
                    ? entry.borderBoxSize[0]
                    : entry.borderBoxSize;
                const offsetHeight = borderBoxSize.blockSize;
                const sha = entry.target.id;
                setNodeHeights(prev => ({ ...prev, [sha]: offsetHeight }));
            }
        });
        props.commits.forEach(commit => resizeObserver.observe(nodes.current[commit.commit], {
            box: 'border-box'
        }));
        return () => resizeObserver.disconnect();
    }, [props.commits]);
    /**
     * Open the context menu on the advanced view
     *
     * @param selectedCommit The commit on which the context menu is opened
     * @param event The click event
     */
    const openContextMenu = (selectedCommit, event) => {
        event.preventDefault();
        const contextMenu = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_1__.Menu({ commands: props.commands });
        const commands = [_tokens__WEBPACK_IMPORTED_MODULE_3__.ContextCommandIDs.gitTagAdd];
        (0,_commandsAndMenu__WEBPACK_IMPORTED_MODULE_4__.addHistoryMenuItems)(commands, contextMenu, selectedCommit);
        contextMenu.open(event.clientX, event.clientY);
    };
    return (react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", { className: _style_HistorySideBarStyle__WEBPACK_IMPORTED_MODULE_5__.historySideBarWrapperStyle },
        !props.model.selectedHistoryFile && (react__WEBPACK_IMPORTED_MODULE_2__.createElement(_GitCommitGraph__WEBPACK_IMPORTED_MODULE_6__.GitCommitGraph, { commits: props.commits.map(commit => ({
                sha: commit.commit,
                parents: commit.pre_commits
            })), getNodeHeight: (sha) => { var _a; return (_a = nodeHeights[sha]) !== null && _a !== void 0 ? _a : 55; } })),
        react__WEBPACK_IMPORTED_MODULE_2__.createElement("ol", { className: _style_HistorySideBarStyle__WEBPACK_IMPORTED_MODULE_5__.historySideBarStyle },
            !!props.model.selectedHistoryFile && (react__WEBPACK_IMPORTED_MODULE_2__.createElement(_FileItem__WEBPACK_IMPORTED_MODULE_7__.FileItem, { className: _style_HistorySideBarStyle__WEBPACK_IMPORTED_MODULE_5__.selectedHistoryFileStyle, model: props.model, trans: props.trans, actions: react__WEBPACK_IMPORTED_MODULE_2__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_8__.ActionButton, { className: _style_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_9__.hiddenButtonStyle, icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.closeIcon, title: props.trans.__('Discard file history'), onClick: removeSelectedFile }), file: props.model.selectedHistoryFile, onDoubleClick: removeSelectedFile })),
            commits.length ? (commits.map((commit) => {
                var _a, _b, _c;
                const commonProps = {
                    commit,
                    branches: props.branches,
                    tagsList: props.tagsList,
                    model: props.model,
                    commands: props.commands,
                    trans: props.trans
                };
                // Only pass down callback when single file history is open
                // and its diff is viewable
                const onOpenDiff = props.model.selectedHistoryFile && !commit.is_binary
                    ? (0,_utils__WEBPACK_IMPORTED_MODULE_10__.openFileDiff)(props.commands)(commit)((_a = commit.file_path) !== null && _a !== void 0 ? _a : props.model.selectedHistoryFile.to, !commit.is_binary, commit.previous_file_path)
                    : undefined;
                const isReferenceCommit = commit.commit === ((_b = props.referenceCommit) === null || _b === void 0 ? void 0 : _b.commit);
                const isChallengerCommit = commit.commit === ((_c = props.challengerCommit) === null || _c === void 0 ? void 0 : _c.commit);
                return (react__WEBPACK_IMPORTED_MODULE_2__.createElement(_PastCommitNode__WEBPACK_IMPORTED_MODULE_11__.PastCommitNode, { key: commit.commit, setRef: node => {
                        nodes.current[commit.commit] = node;
                    }, ...commonProps, isReferenceCommit: isReferenceCommit, isChallengerCommit: isChallengerCommit, onOpenDiff: onOpenDiff, onSelectForCompare: isChallengerCommit
                        ? undefined
                        : props.onSelectForCompare(commit), onCompareWithSelected: isReferenceCommit || props.referenceCommit === null
                        ? undefined
                        : props.onCompareWithSelected(commit), expanded: expandedCommits.includes(commit.commit), toggleCommitExpansion: sha => setExpandedCommits(prevExpandedCommits => {
                        if (prevExpandedCommits.includes(sha)) {
                            return prevExpandedCommits.filter(commit => commit !== sha);
                        }
                        else {
                            return [...prevExpandedCommits, sha];
                        }
                    }), contextMenu: openContextMenu }, !props.model.selectedHistoryFile && (react__WEBPACK_IMPORTED_MODULE_2__.createElement(_SinglePastCommitInfo__WEBPACK_IMPORTED_MODULE_12__.SinglePastCommitInfo, { ...commonProps, onOpenDiff: (0,_utils__WEBPACK_IMPORTED_MODULE_10__.openFileDiff)(props.commands)(commit) }))));
            })) : (react__WEBPACK_IMPORTED_MODULE_2__.createElement("li", { className: _style_HistorySideBarStyle__WEBPACK_IMPORTED_MODULE_5__.noHistoryFoundStyle }, props.trans.__('No history found.'))))));
};


/***/ }),

/***/ "./lib/components/ManageRemoteDialogue.js":
/*!************************************************!*\
  !*** ./lib/components/ManageRemoteDialogue.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ManageRemoteDialogue: () => (/* binding */ ManageRemoteDialogue)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_icons_material_Clear__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/icons-material/Clear */ "./node_modules/@mui/icons-material/Clear.js");
/* harmony import */ var _mui_material_Dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/Dialog */ "./node_modules/@mui/material/Dialog/Dialog.js");
/* harmony import */ var _mui_material_DialogActions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material/DialogActions */ "./node_modules/@mui/material/DialogActions/DialogActions.js");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ActionButton */ "./lib/components/ActionButton.js");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_ManageRemoteDialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../style/ManageRemoteDialog */ "./lib/style/ManageRemoteDialog.js");
/* harmony import */ var _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../style/NewBranchDialog */ "./lib/style/NewBranchDialog.js");
/* harmony import */ var _style_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../style/icons */ "./lib/style/icons.js");










class ManageRemoteDialogue extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor(props) {
        super(props);
        this._nameInput = null;
        this._urlInput = null;
        this._addRemoteButton = null;
        this.state = {
            newRemote: {
                name: '',
                url: ''
            },
            existingRemotes: null
        };
    }
    async componentDidMount() {
        try {
            const remotes = await this.props.model.getRemotes();
            this.setState({ existingRemotes: remotes });
        }
        catch (err) {
            console.error(err);
        }
    }
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Dialog__WEBPACK_IMPORTED_MODULE_3__["default"], { classes: {
                paper: _style_ManageRemoteDialog__WEBPACK_IMPORTED_MODULE_4__.remoteDialogClass
            }, open: true, onClose: this.props.onClose },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_5__.titleWrapperClass },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_5__.titleClass }, this.props.trans.__('Manage Remotes')),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_5__.closeButtonClass },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_icons_material_Clear__WEBPACK_IMPORTED_MODULE_6__["default"], { titleAccess: this.props.trans.__('Close this dialog'), fontSize: "small", onClick: () => this.props.onClose() }))),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_5__.contentWrapperClass },
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", { className: _style_ManageRemoteDialog__WEBPACK_IMPORTED_MODULE_4__.remoteDialogInputClass },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, this.props.trans.__('Enter a new remote repository name and URL')),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { ref: node => {
                            this._nameInput = node;
                        }, type: "text", placeholder: this.props.trans.__('name'), onChange: event => this.setState({
                            newRemote: {
                                ...this.state.newRemote,
                                name: event.target.value
                            }
                        }) }),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { ref: node => {
                            this._urlInput = node;
                        }, type: "text", placeholder: this.props.trans.__('Remote Git repository URL'), onChange: event => this.setState({
                            newRemote: {
                                ...this.state.newRemote,
                                url: event.target.value
                            }
                        }), onKeyPress: e => {
                            var _a;
                            if (e.key === 'Enter') {
                                (_a = this._addRemoteButton) === null || _a === void 0 ? void 0 : _a.click();
                            }
                        } })),
                this.props.warningContent && (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: "jp-RemoteDialog-warning" }, this.props.warningContent)),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_DialogActions__WEBPACK_IMPORTED_MODULE_7__["default"], { className: _style_ManageRemoteDialog__WEBPACK_IMPORTED_MODULE_4__.actionsWrapperClass },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { ref: btn => {
                            this._addRemoteButton = btn;
                        }, className: (0,typestyle__WEBPACK_IMPORTED_MODULE_2__.classes)(_style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_5__.buttonClass, _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_5__.createButtonClass), type: "button", title: this.props.trans.__('Add Remote'), value: this.props.trans.__('Add'), onClick: async () => {
                            const { name, url } = this.state.newRemote;
                            try {
                                await this.props.model.addRemote(url, name);
                                this._nameInput.value = '';
                                this._urlInput.value = '';
                                this.setState(prevState => {
                                    var _a;
                                    return ({
                                        existingRemotes: [
                                            ...((_a = prevState.existingRemotes) !== null && _a !== void 0 ? _a : []),
                                            prevState.newRemote
                                        ],
                                        newRemote: { name: '', url: '' }
                                    });
                                });
                            }
                            catch (error) {
                                console.error(error);
                                (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showErrorMessage)(this.props.trans.__('Error when adding remote repository'), error);
                            }
                        }, disabled: !this.state.newRemote.name || !this.state.newRemote.url })),
                react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _style_ManageRemoteDialog__WEBPACK_IMPORTED_MODULE_4__.existingRemoteWrapperClass },
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, this.props.trans.__('Existing Remotes:')),
                    this.state.existingRemotes === null ? (react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "Loading remote repositories...")) : this.state.existingRemotes.length > 0 ? (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { className: _style_ManageRemoteDialog__WEBPACK_IMPORTED_MODULE_4__.existingRemoteGridClass }, this.state.existingRemotes.map((remote, index) => (react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, { key: `remote-${index}` },
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, remote.name),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, remote.url),
                        react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_8__.ActionButton, { icon: _style_icons__WEBPACK_IMPORTED_MODULE_9__.trashIcon, title: this.props.trans.__('Remove this remote'), onClick: async () => {
                                var _a;
                                await this.props.model.removeRemote(remote.name);
                                this.setState({
                                    existingRemotes: ((_a = this.state.existingRemotes) !== null && _a !== void 0 ? _a : []).filter(r => r.name !== remote.name)
                                });
                            } })))))) : (react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, " This repository does not have any remote. "))))));
    }
}


/***/ }),

/***/ "./lib/components/NewBranchDialog.js":
/*!*******************************************!*\
  !*** ./lib/components/NewBranchDialog.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NewBranchDialog: () => (/* binding */ NewBranchDialog)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_icons_material_Clear__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/icons-material/Clear */ "./node_modules/@mui/icons-material/Clear.js");
/* harmony import */ var _mui_material_Dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material/Dialog */ "./node_modules/@mui/material/Dialog/Dialog.js");
/* harmony import */ var _mui_material_DialogActions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material/DialogActions */ "./node_modules/@mui/material/DialogActions/DialogActions.js");
/* harmony import */ var _mui_material_ListItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material/ListItem */ "./node_modules/@mui/material/ListItem/ListItem.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_window__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-window */ "webpack/sharing/consume/default/react-window/react-window");
/* harmony import */ var react_window__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_window__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../style/NewBranchDialog */ "./lib/style/NewBranchDialog.js");
/* harmony import */ var _style_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../style/icons */ "./lib/style/icons.js");










const ITEM_HEIGHT = 27.5; // HTML element height for a single branch
const CURRENT_BRANCH_HEIGHT = 66.5; // HTML element height for the current branch with description
const HEIGHT = 200; // HTML element height for the branches list
/**
 * React component for rendering a dialog to create a new branch.
 */
class NewBranchDialog extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
    /**
     * Returns a React component for rendering a branch menu.
     *
     * @param props - component properties
     * @returns React component
     */
    constructor(props) {
        super(props);
        /**
         * Renders a branch menu item.
         *
         * @param props Row properties
         * @returns React element
         */
        this._renderItem = (props) => {
            const { data, index, style } = props;
            const branch = data[index];
            const isBase = branch.name === this.state.base;
            const isCurrent = branch.name === this.props.currentBranch;
            let isBold;
            let desc;
            if (isCurrent) {
                isBold = true;
                desc = this.props.trans.__('The current branch. Pick this if you want to build on work done in this branch.');
            }
            else if (['main', 'main'].includes(branch.name)) {
                isBold = true;
                desc = this.props.trans.__('The default branch. Pick this if you want to start fresh from the default branch.');
            }
            return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material_ListItem__WEBPACK_IMPORTED_MODULE_4__["default"], { button: true, title: this.props.trans.__('Create a new branch based on: %1', branch.name), className: (0,typestyle__WEBPACK_IMPORTED_MODULE_3__.classes)(_style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_5__.listItemClass, isBase ? _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_5__.activeListItemClass : null), onClick: this._onBranchClickFactory(branch.name), style: style },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement(_style_icons__WEBPACK_IMPORTED_MODULE_6__.branchIcon.react, { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_5__.listItemIconClass, tag: "span" }),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_5__.listItemContentClass },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", { className: (0,typestyle__WEBPACK_IMPORTED_MODULE_3__.classes)(_style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_5__.listItemTitleClass, isBold ? _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_5__.listItemBoldTitleClass : null) }, branch.name),
                    desc ? (react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_5__.listItemDescClass }, this.props.trans.__(desc))) : null)));
        };
        /**
         * Callback invoked upon closing the dialog.
         *
         * @param event - event object
         */
        this._onClose = () => {
            this.props.onClose();
            this.setState({
                name: '',
                filter: '',
                error: ''
            });
        };
        /**
         * Callback invoked upon a change to the menu filter.
         *
         * @param event - event object
         */
        this._onFilterChange = (event) => {
            var _a;
            (_a = this._branchList.current) === null || _a === void 0 ? void 0 : _a.resetAfterIndex(0);
            this.setState({
                filter: event.target.value
            });
        };
        /**
         * Callback invoked to reset the menu filter.
         */
        this._resetFilter = () => {
            var _a;
            (_a = this._branchList.current) === null || _a === void 0 ? void 0 : _a.resetAfterIndex(0);
            this.setState({
                filter: ''
            });
        };
        /**
         * Callback invoked upon a change to the branch name input element.
         *
         * @param event - event object
         */
        this._onNameChange = (event) => {
            this.setState({
                name: event.target.value,
                error: ''
            });
        };
        this._branchList = react__WEBPACK_IMPORTED_MODULE_1__.createRef();
        this.state = {
            name: '',
            base: props.currentBranch || '',
            filter: '',
            error: ''
        };
    }
    /**
     * Renders a dialog for creating a new branch.
     *
     * @returns React element
     */
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material_Dialog__WEBPACK_IMPORTED_MODULE_7__["default"], { classes: {
                paper: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_5__.branchDialogClass
            }, open: this.props.open, onClose: this._onClose },
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_5__.titleWrapperClass },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_5__.titleClass }, this.props.trans.__('Create a Branch')),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_5__.closeButtonClass },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_icons_material_Clear__WEBPACK_IMPORTED_MODULE_8__["default"], { titleAccess: this.props.trans.__('Close this dialog'), fontSize: "small", onClick: this._onClose }))),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_5__.contentWrapperClass },
                this.state.error ? (react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_5__.errorMessageClass }, this.state.error)) : null,
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", null, this.props.trans.__('Name')),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_5__.nameInputClass, type: "text", onChange: this._onNameChange, value: this.state.name, placeholder: "", title: this.props.trans.__('Enter a branch name') }),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", null, this.props.trans.__('Create branch based on…')),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_5__.filterWrapperClass },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_5__.filterClass },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_5__.filterInputClass, type: "text", onChange: this._onFilterChange, value: this.state.filter, placeholder: this.props.trans.__('Filter'), title: this.props.trans.__('Filter branch menu') }),
                        this.state.filter ? (react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_5__.filterClearClass },
                            react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_icons_material_Clear__WEBPACK_IMPORTED_MODULE_8__["default"], { titleAccess: this.props.trans.__('Clear the current filter'), fontSize: "small", onClick: this._resetFilter }))) : null)),
                this._renderItems()),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material_DialogActions__WEBPACK_IMPORTED_MODULE_9__["default"], { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_5__.actionsWrapperClass },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { className: (0,typestyle__WEBPACK_IMPORTED_MODULE_3__.classes)(_style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_5__.buttonClass, _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_5__.cancelButtonClass), type: "button", title: this.props.trans.__('Close this dialog without creating a new branch'), value: this.props.trans.__('Cancel'), onClick: this._onClose }),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { className: (0,typestyle__WEBPACK_IMPORTED_MODULE_3__.classes)(_style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_5__.buttonClass, _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_5__.createButtonClass), type: "button", title: this.props.trans.__('Create a new branch'), value: this.props.trans.__('Create Branch'), onClick: () => {
                        this._createBranch();
                    }, disabled: this.state.name === '' || this.state.error !== '' }))));
    }
    /**
     * Renders branch menu items.
     *
     * @returns array of React elements
     */
    _renderItems() {
        const current = this.props.currentBranch;
        // Perform a "simple" filter... (TODO: consider implementing fuzzy filtering)
        const filter = this.state.filter;
        const branches = this.props.branches
            .filter(branch => !filter || branch.name.includes(filter))
            .slice()
            .sort(comparator);
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_window__WEBPACK_IMPORTED_MODULE_2__.VariableSizeList, { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_5__.listWrapperClass, height: HEIGHT, estimatedItemSize: ITEM_HEIGHT, itemCount: branches.length, itemData: branches, itemKey: (index, data) => data[index].name, itemSize: index => {
                const branch = branches[index];
                return [this.props.currentBranch, 'main', 'main'].includes(branch.name)
                    ? CURRENT_BRANCH_HEIGHT
                    : ITEM_HEIGHT;
            }, ref: this._branchList, style: { overflowX: 'hidden' }, width: 'auto' }, this._renderItem));
        /**
         * Comparator function for sorting branches.
         *
         * @private
         * @param a - first branch
         * @param b - second branch
         * @returns integer indicating sort order
         */
        function comparator(a, b) {
            if (a.name === current) {
                return -1;
            }
            else if (b.name === current) {
                return 1;
            }
            if (a.name === 'main') {
                return -1;
            }
            else if (b.name === 'main') {
                return 1;
            }
            if (a.name === 'main') {
                return -1;
            }
            else if (b.name === 'main') {
                return 1;
            }
            return 0;
        }
    }
    /**
     * Returns a callback which is invoked upon clicking a branch name.
     *
     * @param branch - branch name
     * @returns callback
     */
    _onBranchClickFactory(branch) {
        /**
         * Callback invoked upon clicking a branch name.
         *
         * @private
         * @param event - event object
         */
        const onClick = () => {
            this.setState({
                base: branch
            });
        };
        return onClick;
    }
    /**
     * Creates a new branch.
     *
     * @param branch - branch name
     * @returns promise which resolves upon attempting to create a new branch
     */
    async _createBranch() {
        var _a;
        const opts = {
            newBranch: true,
            branchname: this.state.name,
            startpoint: this.state.base
        };
        const id = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.emit(this.props.trans.__('Creating branch…'), 'in-progress', { autoClose: false });
        try {
            await this.props.model.checkout(opts);
        }
        catch (err) {
            this.setState({
                error: err.message.replace(/^fatal:/, '')
            });
            _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.update({
                id,
                message: this.props.trans.__('Failed to create branch.'),
                type: 'error',
                autoClose: false
            });
            return;
        }
        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.update({
            id,
            message: this.props.trans.__('Branch created.'),
            type: 'success',
            autoClose: 5000
        });
        // Close the branch dialog:
        this.props.onClose();
        // Reset the branch name and filter:
        (_a = this._branchList.current) === null || _a === void 0 ? void 0 : _a.resetAfterIndex(0);
        this.setState({
            name: '',
            filter: ''
        });
    }
}


/***/ }),

/***/ "./lib/components/NewTagDialog.js":
/*!****************************************!*\
  !*** ./lib/components/NewTagDialog.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DialogBoxCommitGraph: () => (/* binding */ DialogBoxCommitGraph),
/* harmony export */   NewTagDialogBox: () => (/* binding */ NewTagDialogBox),
/* harmony export */   SingleCommitNode: () => (/* binding */ SingleCommitNode)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_icons_material_Clear__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/icons-material/Clear */ "./node_modules/@mui/icons-material/Clear.js");
/* harmony import */ var _mui_material_Dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material/Dialog */ "./node_modules/@mui/material/Dialog/Dialog.js");
/* harmony import */ var _mui_material_DialogActions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material/DialogActions */ "./node_modules/@mui/material/DialogActions/DialogActions.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../style/NewBranchDialog */ "./lib/style/NewBranchDialog.js");
/* harmony import */ var _style_NewTagDialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../style/NewTagDialog */ "./lib/style/NewTagDialog.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../tokens */ "./lib/tokens.js");
/* harmony import */ var _GitCommitGraph__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./GitCommitGraph */ "./lib/components/GitCommitGraph.js");










const DialogBoxCommitGraph = (props) => {
    const { filter, baseCommitId, updateBaseCommitId } = props;
    const pastCommits = props.pastCommits
        .filter(commit => !filter ||
        commit.commit_msg.toLowerCase().includes(filter.toLowerCase()))
        .slice();
    const [nodeHeights, setNodeHeights] = react__WEBPACK_IMPORTED_MODULE_1__.useState({});
    const nodes = react__WEBPACK_IMPORTED_MODULE_1__.useRef({});
    react__WEBPACK_IMPORTED_MODULE_1__.useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                const borderBoxSize = Array.isArray(entry.borderBoxSize)
                    ? entry.borderBoxSize[0]
                    : entry.borderBoxSize;
                const offsetHeight = borderBoxSize.blockSize;
                const sha = entry.target.id;
                setNodeHeights(prev => ({ ...prev, [sha]: offsetHeight }));
            }
        });
        pastCommits.forEach(commit => {
            const node = nodes.current[commit.commit];
            resizeObserver.observe(node, {
                box: 'border-box'
            });
        });
        return () => resizeObserver.disconnect();
    }, [pastCommits]);
    let isFilter;
    if (filter === '') {
        isFilter = true;
    }
    if (props.isSingleCommit === true) {
        isFilter = false;
    }
    return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_NewTagDialog__WEBPACK_IMPORTED_MODULE_3__.historyDialogBoxWrapperStyle },
        isFilter && (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_GitCommitGraph__WEBPACK_IMPORTED_MODULE_4__.GitCommitGraph, { commits: pastCommits.map(commit => ({
                sha: commit.commit,
                parents: commit.pre_commits
            })), getNodeHeight: (sha) => { var _a; return (_a = nodeHeights[sha]) !== null && _a !== void 0 ? _a : 55; } })),
        react__WEBPACK_IMPORTED_MODULE_1__.createElement("ol", { className: _style_NewTagDialog__WEBPACK_IMPORTED_MODULE_3__.historyDialogBoxStyle }, pastCommits.map((commit, index) => {
            return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(SingleCommitNode, { key: index, commit: commit, baseCommitId: baseCommitId, trans: props.trans, setRef: node => {
                    nodes.current[commit.commit] = node;
                }, updateBaseCommitId: updateBaseCommitId }));
        }))));
};
const SingleCommitNode = (props) => {
    const { baseCommitId, updateBaseCommitId } = props;
    const isLatest = props.commit.commit === baseCommitId;
    let isBold;
    if (isLatest) {
        isBold = true;
    }
    /**
     * Returns a callback which is invoked upon clicking a commit name.
     *
     * @param commit - commit
     * @returns callback
     */
    const onCommitClickFactory = react__WEBPACK_IMPORTED_MODULE_1__.useCallback((commitId) => {
        return onClick;
        /**
         * Callback invoked upon clicking a commit.
         *
         * @private
         * @param event - event object
         */
        function onClick() {
            updateBaseCommitId(commitId);
        }
    }, [baseCommitId]);
    return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("li", { id: props.commit.commit, ref: props.setRef, className: (0,typestyle__WEBPACK_IMPORTED_MODULE_2__.classes)(_style_NewTagDialog__WEBPACK_IMPORTED_MODULE_3__.commitWrapperClass, isLatest ? _style_NewTagDialog__WEBPACK_IMPORTED_MODULE_3__.activeListItemClass : null), title: props.trans.__('Create a new tag pointing to commit %1: %2 by %3', props.commit.commit in _tokens__WEBPACK_IMPORTED_MODULE_5__.Git.Diff.SpecialRef
            ? _tokens__WEBPACK_IMPORTED_MODULE_5__.Git.Diff.SpecialRef[+props.commit.commit]
            : props.commit.commit.slice(0, 7), props.commit.commit_msg, props.commit.author), onClick: onCommitClickFactory(props.commit.commit) },
        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_NewTagDialog__WEBPACK_IMPORTED_MODULE_3__.commitHeaderClass },
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: (0,typestyle__WEBPACK_IMPORTED_MODULE_2__.classes)(_style_NewTagDialog__WEBPACK_IMPORTED_MODULE_3__.commitHeaderItemClass, isBold ? _style_NewTagDialog__WEBPACK_IMPORTED_MODULE_3__.commitItemBoldClass : null) }, props.commit.author),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: (0,typestyle__WEBPACK_IMPORTED_MODULE_2__.classes)(_style_NewTagDialog__WEBPACK_IMPORTED_MODULE_3__.commitHeaderItemClass, isBold ? _style_NewTagDialog__WEBPACK_IMPORTED_MODULE_3__.commitItemBoldClass : null) }, +props.commit.commit in _tokens__WEBPACK_IMPORTED_MODULE_5__.Git.Diff.SpecialRef
                ? _tokens__WEBPACK_IMPORTED_MODULE_5__.Git.Diff.SpecialRef[+props.commit.commit]
                : props.commit.commit.slice(0, 7)),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: (0,typestyle__WEBPACK_IMPORTED_MODULE_2__.classes)(_style_NewTagDialog__WEBPACK_IMPORTED_MODULE_3__.commitHeaderItemClass, isBold ? _style_NewTagDialog__WEBPACK_IMPORTED_MODULE_3__.commitItemBoldClass : null) }, props.commit.date)),
        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: (0,typestyle__WEBPACK_IMPORTED_MODULE_2__.classes)(_style_NewTagDialog__WEBPACK_IMPORTED_MODULE_3__.commitBodyClass, isBold ? _style_NewTagDialog__WEBPACK_IMPORTED_MODULE_3__.commitHeaderBoldClass : null) }, props.commit.commit_msg)));
};
const NewTagDialogBox = (props) => {
    var _a, _b;
    const [nameState, setNameState] = react__WEBPACK_IMPORTED_MODULE_1__.useState('');
    const [baseCommitIdState, setBaseCommitIdState] = react__WEBPACK_IMPORTED_MODULE_1__.useState((_b = (_a = props.pastCommits[0]) === null || _a === void 0 ? void 0 : _a.commit) !== null && _b !== void 0 ? _b : null);
    const [filterState, setFilterState] = react__WEBPACK_IMPORTED_MODULE_1__.useState('');
    const [errorState, setErrorState] = react__WEBPACK_IMPORTED_MODULE_1__.useState('');
    /**
     * Callback invoked upon closing the dialog.
     *
     * @param event - event object
     */
    const onClose = () => {
        props.onClose();
        setNameState('');
        setFilterState('');
        setErrorState('');
    };
    /**
     * Callback invoked upon a change to the menu filter.
     *
     * @param event - event object
     */
    const onFilterChange = react__WEBPACK_IMPORTED_MODULE_1__.useCallback((event) => {
        setFilterState(event.target.value);
    }, [filterState]);
    /**
     * Callback invoked to reset the menu filter.
     */
    const resetFilter = () => {
        setFilterState('');
    };
    /**
     * Callback invoked upon a change to the tag name input element.
     *
     * @param event - event object
     */
    const onNameChange = react__WEBPACK_IMPORTED_MODULE_1__.useCallback((event) => {
        setNameState(event.target.value);
        setErrorState('');
    }, [nameState]);
    /**
     * Creates a new tag.
     *
     * @param tag - tag name
     * @returns promise which resolves upon attempting to create a new tag
     */
    const createTag = async () => {
        const tagName = nameState;
        const baseCommitId = baseCommitIdState;
        const id = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.emit(props.trans.__('Creating tag…'), 'in-progress', { autoClose: false });
        try {
            await props.model.setTag(tagName, baseCommitId);
        }
        catch (err) {
            setErrorState(err.message.replace(/^fatal:/, ''));
            _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.update({
                id,
                message: props.trans.__('Failed to create tag.'),
                type: 'error',
                autoClose: false
            });
            return;
        }
        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.update({
            id,
            message: props.trans.__('Tag created.'),
            type: 'success',
            autoClose: 5000
        });
        // Close the tag dialog:
        props.onClose();
        setNameState('');
        setFilterState('');
    };
    return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material_Dialog__WEBPACK_IMPORTED_MODULE_6__["default"], { classes: {
            paper: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_7__.branchDialogClass
        }, open: props.open, onClose: onClose },
        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_7__.titleWrapperClass },
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_7__.titleClass }, props.trans.__('Create a Tag')),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_7__.closeButtonClass },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_icons_material_Clear__WEBPACK_IMPORTED_MODULE_8__["default"], { titleAccess: props.trans.__('Close this dialog'), fontSize: "small", onClick: onClose }))),
        react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_7__.contentWrapperClass },
            errorState ? react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_7__.errorMessageClass }, errorState) : null,
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", null, props.trans.__('Name')),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_7__.nameInputClass, type: "text", onChange: onNameChange, value: nameState, placeholder: "", title: props.trans.__('Enter a tag name') }),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", null, props.trans.__('Create tag pointing to…')),
            props.isSingleCommit ? null : (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_7__.filterWrapperClass },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_7__.filterClass },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_7__.filterInputClass, type: "text", onChange: onFilterChange, value: filterState, placeholder: props.trans.__('Filter by commit message'), title: props.trans.__('Filter history of commits menu') }),
                    filterState ? (react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_7__.filterClearClass },
                        react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_icons_material_Clear__WEBPACK_IMPORTED_MODULE_8__["default"], { titleAccess: props.trans.__('Clear the current filter'), fontSize: "small", onClick: resetFilter }))) : null))),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement(DialogBoxCommitGraph, { pastCommits: props.pastCommits, model: props.model, trans: props.trans, filter: filterState, baseCommitId: baseCommitIdState, updateBaseCommitId: setBaseCommitIdState, isSingleCommit: props.isSingleCommit })),
        react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material_DialogActions__WEBPACK_IMPORTED_MODULE_9__["default"], { className: _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_7__.actionsWrapperClass },
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { className: (0,typestyle__WEBPACK_IMPORTED_MODULE_2__.classes)(_style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_7__.buttonClass, _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_7__.cancelButtonClass), type: "button", title: props.trans.__('Close this dialog without creating a new tag'), value: props.trans.__('Cancel'), onClick: onClose }),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { className: (0,typestyle__WEBPACK_IMPORTED_MODULE_2__.classes)(_style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_7__.buttonClass, _style_NewBranchDialog__WEBPACK_IMPORTED_MODULE_7__.createButtonClass), type: "button", title: props.trans.__('Create a new tag'), value: props.trans.__('Create Tag'), onClick: () => {
                    createTag();
                }, disabled: nameState === '' || errorState !== '' }))));
};


/***/ }),

/***/ "./lib/components/PastCommitNode.js":
/*!******************************************!*\
  !*** ./lib/components/PastCommitNode.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PastCommitNode: () => (/* binding */ PastCommitNode)
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../style/icons */ "./lib/style/icons.js");
/* harmony import */ var _style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../style/PastCommitNode */ "./lib/style/PastCommitNode.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tokens */ "./lib/tokens.js");
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ActionButton */ "./lib/components/ActionButton.js");







/**
 * React component for rendering an individual commit.
 */
class PastCommitNode extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
    /**
     * Returns a React component for rendering an individual commit.
     *
     * @param props - component properties
     * @returns React component
     */
    constructor(props) {
        super(props);
        /**
         * Callback invoked upon clicking on an individual commit.
         *
         * @param event - event object
         */
        this._onCommitClick = (event, sha) => {
            var _a;
            if (this.props.children) {
                this.props.toggleCommitExpansion(sha);
            }
            else {
                (_a = this.props.onOpenDiff) === null || _a === void 0 ? void 0 : _a.call(this, event);
            }
        };
    }
    /**
     * Renders the component.
     *
     * @returns React element
     */
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("li", { id: this.props.commit.commit, ref: el => this.props.setRef(el), className: (0,typestyle__WEBPACK_IMPORTED_MODULE_2__.classes)(_style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__.commitWrapperClass, !this.props.children && !!this.props.onOpenDiff
                ? _style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__.singleFileCommitClass
                : this.props.expanded
                    ? _style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__.commitExpandedClass
                    : null, this.props.isReferenceCommit && _style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__.referenceCommitNodeClass, this.props.isChallengerCommit && _style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__.challengerCommitNodeClass), title: this.props.children
                ? this.props.trans.__('View commit details')
                : this.props.trans.__('View file changes'), onClick: event => this._onCommitClick(event, this.props.commit.commit), onContextMenu: this.props.contextMenu &&
                (event => {
                    this.props.contextMenu(this.props.commit, event);
                }) },
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__.commitHeaderClass },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__.commitHeaderItemClass }, this.props.commit.author),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__.commitHeaderItemClass }, +this.props.commit.commit in _tokens__WEBPACK_IMPORTED_MODULE_4__.Git.Diff.SpecialRef
                    ? _tokens__WEBPACK_IMPORTED_MODULE_4__.Git.Diff.SpecialRef[+this.props.commit.commit]
                    : this.props.commit.commit.slice(0, 7)),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__.commitHeaderItemClass }, this.props.commit.date),
                !this.props.commit.is_binary && (react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null,
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_5__.ActionButton, { className: _style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__.iconButtonClass, disabled: this.props.onSelectForCompare === null, icon: _style_icons__WEBPACK_IMPORTED_MODULE_6__.selectForCompareIcon, title: this.props.trans.__('Select for compare'), onClick: this.props.onSelectForCompare }),
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_5__.ActionButton, { className: _style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__.iconButtonClass, disabled: this.props.onCompareWithSelected === null, icon: _style_icons__WEBPACK_IMPORTED_MODULE_6__.compareWithSelectedIcon, title: this.props.trans.__('Compare with selected'), onClick: this.props.onCompareWithSelected }))),
                this.props.children ? (this.props.expanded ? (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.caretUpIcon.react, { className: _style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__.iconButtonClass, tag: "span" })) : (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.caretDownIcon.react, { className: _style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__.iconButtonClass, tag: "span" }))) : (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_style_icons__WEBPACK_IMPORTED_MODULE_6__.diffIcon.react, { className: _style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__.iconButtonClass, tag: "span" }))),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__.branchWrapperClass }, this._renderBranches()),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__.branchWrapperClass }, this._renderTags()),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__.commitBodyClass },
                this.props.commit.commit_msg,
                this.props.expanded && this.props.children)));
    }
    /**
     * Renders branch information.
     *
     * @returns array of React elements
     */
    _renderBranches() {
        const curr = this.props.commit.commit;
        const branches = [];
        for (let i = 0; i < this.props.branches.length; i++) {
            const branch = this.props.branches[i];
            if (branch.top_commit && branch.top_commit === curr) {
                branches.push(branch);
            }
        }
        return branches.map(this._renderBranch, this);
    }
    /**
     * Renders individual branch data.
     *
     * @param branch - branch data
     * @returns React element
     */
    _renderBranch(branch) {
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, { key: branch.name },
            branch.is_current_branch && (react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: (0,typestyle__WEBPACK_IMPORTED_MODULE_2__.classes)(_style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__.branchClass, _style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__.workingBranchClass) }, "working")),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: (0,typestyle__WEBPACK_IMPORTED_MODULE_2__.classes)(_style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__.branchClass, branch.is_remote_branch ? _style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__.remoteBranchClass : _style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__.localBranchClass) }, branch.name)));
    }
    /**
     * Renders tags information.
     *
     * @returns array of React elements
     */
    _renderTags() {
        const curr = this.props.commit.commit;
        const tags = [];
        for (let i = 0; i < this.props.tagsList.length; i++) {
            const tag = this.props.tagsList[i];
            if (tag.baseCommitId && tag.baseCommitId === curr) {
                tags.push(tag);
            }
        }
        return tags.map(this._renderTag, this);
    }
    /**
     * Renders individual tag data.
     *
     * @param tag - tag data
     * @returns React element
     */
    _renderTag(tag) {
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, { key: tag.name },
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: (0,typestyle__WEBPACK_IMPORTED_MODULE_2__.classes)(_style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__.branchClass, _style_PastCommitNode__WEBPACK_IMPORTED_MODULE_3__.localBranchClass) }, tag.name)));
    }
}


/***/ }),

/***/ "./lib/components/RebaseAction.js":
/*!****************************************!*\
  !*** ./lib/components/RebaseAction.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RebaseAction: () => (/* binding */ RebaseAction)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material/Button */ "./node_modules/@mui/material/Button/Button.js");
/* harmony import */ var _mui_material_ButtonGroup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material/ButtonGroup */ "./node_modules/@mui/material/ButtonGroup/ButtonGroup.js");
/* harmony import */ var _mui_base__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mui/base */ "./node_modules/@mui/base/ClickAwayListener/ClickAwayListener.js");
/* harmony import */ var _mui_material_Grow__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/material/Grow */ "./node_modules/@mui/material/Grow/Grow.js");
/* harmony import */ var _mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @mui/material/MenuItem */ "./node_modules/@mui/material/MenuItem/MenuItem.js");
/* harmony import */ var _mui_material_MenuList__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @mui/material/MenuList */ "./node_modules/@mui/material/MenuList/MenuList.js");
/* harmony import */ var _mui_material_Paper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/material/Paper */ "./node_modules/@mui/material/Paper/Paper.js");
/* harmony import */ var _mui_material_Popper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material/Popper */ "./node_modules/@mui/material/Popper/Popper.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_CommitBox__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../style/CommitBox */ "./lib/style/CommitBox.js");
/* harmony import */ var _style_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../style/icons */ "./lib/style/icons.js");
/* harmony import */ var _style_RebaseActionStyle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../style/RebaseActionStyle */ "./lib/style/RebaseActionStyle.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tokens */ "./lib/tokens.js");















/**
 * Component to trigger action resolving a rebase.
 *
 * @param props Component properties
 */
function RebaseAction(props) {
    const [open, setOpen] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(false);
    const anchor = react__WEBPACK_IMPORTED_MODULE_1___default().useRef(null);
    const onToggle = react__WEBPACK_IMPORTED_MODULE_1___default().useCallback(() => {
        setOpen(!open);
    }, []);
    const onClose = react__WEBPACK_IMPORTED_MODULE_1___default().useCallback((event) => {
        var _a;
        if ((_a = anchor.current) === null || _a === void 0 ? void 0 : _a.contains(event.target)) {
            return;
        }
        setOpen(false);
    }, []);
    const onContinue = react__WEBPACK_IMPORTED_MODULE_1___default().useCallback(async () => {
        await props.commands.execute(_tokens__WEBPACK_IMPORTED_MODULE_3__.CommandIDs.gitResolveRebase, {
            action: 'continue'
        });
    }, []);
    const onSkip = react__WEBPACK_IMPORTED_MODULE_1___default().useCallback(async () => {
        await props.commands.execute(_tokens__WEBPACK_IMPORTED_MODULE_3__.CommandIDs.gitResolveRebase, {
            action: 'skip'
        });
    }, []);
    const onAbort = react__WEBPACK_IMPORTED_MODULE_1___default().useCallback(async () => {
        const answer = await (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
            title: props.trans.__('Abort rebase'),
            body: props.trans.__('Are you sure you want to abort the rebase?'),
            buttons: [
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.cancelButton(),
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.warnButton({ label: props.trans.__('Abort') })
            ]
        });
        if (answer.button.accept) {
            await props.commands.execute(_tokens__WEBPACK_IMPORTED_MODULE_3__.CommandIDs.gitResolveRebase, {
                action: 'abort'
            });
        }
    }, []);
    return (react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", { className: _style_RebaseActionStyle__WEBPACK_IMPORTED_MODULE_4__.rebaseActionStyle },
        react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_mui_material_ButtonGroup__WEBPACK_IMPORTED_MODULE_5__["default"], { ref: anchor, fullWidth: true, size: "small" },
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_mui_material_Button__WEBPACK_IMPORTED_MODULE_6__["default"], { classes: {
                    root: _style_CommitBox__WEBPACK_IMPORTED_MODULE_7__.commitButtonClass,
                    disabled: _style_CommitBox__WEBPACK_IMPORTED_MODULE_7__.disabledStyle
                }, disabled: props.hasConflict, title: props.trans.__('Continue the rebase.'), onClick: onContinue }, props.trans.__('Continue')),
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_mui_material_Button__WEBPACK_IMPORTED_MODULE_6__["default"], { title: props.trans.__('Pick another rebase action.'), classes: {
                    root: (0,typestyle__WEBPACK_IMPORTED_MODULE_2__.classes)(_style_CommitBox__WEBPACK_IMPORTED_MODULE_7__.commitButtonClass, _style_CommitBox__WEBPACK_IMPORTED_MODULE_7__.commitVariantSelector)
                }, onClick: onToggle, size: "small", "aria-controls": open ? 'rebase-split-button-menu' : undefined, "aria-expanded": open ? 'true' : undefined },
                react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_style_icons__WEBPACK_IMPORTED_MODULE_8__.verticalMoreIcon.react, { tag: "span" }))),
        react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_mui_material_Popper__WEBPACK_IMPORTED_MODULE_9__["default"], { open: open, anchorEl: anchor.current, transition: true, disablePortal: true }, ({ TransitionProps }) => (react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_mui_material_Grow__WEBPACK_IMPORTED_MODULE_10__["default"], { ...TransitionProps },
            react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_mui_material_Paper__WEBPACK_IMPORTED_MODULE_11__["default"], { classes: { root: (0,typestyle__WEBPACK_IMPORTED_MODULE_2__.classes)(_style_CommitBox__WEBPACK_IMPORTED_MODULE_7__.commitRoot, _style_CommitBox__WEBPACK_IMPORTED_MODULE_7__.commitPaperClass) } },
                react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_mui_base__WEBPACK_IMPORTED_MODULE_12__.ClickAwayListener, { onClickAway: onClose },
                    react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_mui_material_MenuList__WEBPACK_IMPORTED_MODULE_13__["default"], { id: "rebase-split-button-menu" },
                        react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_14__["default"], { key: 'skip', classes: { root: _style_CommitBox__WEBPACK_IMPORTED_MODULE_7__.commitRoot }, onClick: onSkip, title: props.trans.__('Skip the current commit.') }, props.trans.__('Skip')),
                        react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_14__["default"], { key: 'abort', classes: { root: _style_CommitBox__WEBPACK_IMPORTED_MODULE_7__.commitRoot }, onClick: onAbort, title: props.trans.__('Abort the rebase.') }, props.trans.__('Abort'))))))))));
}


/***/ }),

/***/ "./lib/components/ResetRevertDialog.js":
/*!*********************************************!*\
  !*** ./lib/components/ResetRevertDialog.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ResetRevertDialog: () => (/* binding */ ResetRevertDialog)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_icons_material_Clear__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/icons-material/Clear */ "./node_modules/@mui/icons-material/Clear.js");
/* harmony import */ var _mui_material_Dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/Dialog */ "./node_modules/@mui/material/Dialog/Dialog.js");
/* harmony import */ var _mui_material_DialogActions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material/DialogActions */ "./node_modules/@mui/material/DialogActions/DialogActions.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _notifications__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../notifications */ "./lib/notifications.js");
/* harmony import */ var _style_ResetRevertDialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../style/ResetRevertDialog */ "./lib/style/ResetRevertDialog.js");
/* harmony import */ var _CommitMessage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CommitMessage */ "./lib/components/CommitMessage.js");









/**
 * React component for rendering a dialog for resetting or reverting a single commit.
 */
class ResetRevertDialog extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
    /**
     * Returns a React component for resetting or reverting a single commit.
     *
     * @param props - component properties
     * @returns React component
     */
    constructor(props) {
        super(props);
        /**
         * Callback invoked upon updating a commit message summary.
         */
        this._onSummaryChange = (summary) => {
            this.setState({
                summary
            });
        };
        /**
         * Callback invoked upon updating a commit message description.
         */
        this._onDescriptionChange = (description) => {
            this.setState({
                description
            });
        };
        /**
         * Callback invoked upon clicking on a dialog.
         *
         * @param event - event object
         */
        this._onClick = (event) => {
            event.stopPropagation();
        };
        /**
         * Callback invoked upon closing the dialog.
         *
         * @param event - event object
         */
        this._onClose = (event) => {
            event.stopPropagation();
            this.props.onClose();
            this._reset();
        };
        /**
         * Callback invoked upon clicking a button to reset or revert a commit.
         *
         * @param event - event object
         */
        this._onSubmit = async () => {
            this.setState({
                disabled: true
            });
            if (this.props.action === 'reset') {
                this._resetCommit(this.props.commit.commit);
            }
            else {
                this._revertCommit(this.props.commit.commit);
            }
            this._reset();
            this.props.onClose();
        };
        this.state = {
            summary: '',
            description: '',
            disabled: false
        };
    }
    /**
     * Renders a dialog.
     *
     * @returns React element
     */
    render() {
        const shortCommit = this.props.commit.commit.slice(0, 7);
        const isRevert = this.props.action === 'revert';
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material_Dialog__WEBPACK_IMPORTED_MODULE_3__["default"], { classes: {
                paper: _style_ResetRevertDialog__WEBPACK_IMPORTED_MODULE_4__.resetRevertDialogClass
            }, open: this.props.open, onClick: this._onClick, onClose: this._onClose },
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_ResetRevertDialog__WEBPACK_IMPORTED_MODULE_4__.titleWrapperClass },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", { className: _style_ResetRevertDialog__WEBPACK_IMPORTED_MODULE_4__.titleClass }, isRevert
                    ? this.props.trans.__('Revert Changes')
                    : this.props.trans.__('Reset Changes')),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _style_ResetRevertDialog__WEBPACK_IMPORTED_MODULE_4__.closeButtonClass },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_icons_material_Clear__WEBPACK_IMPORTED_MODULE_5__["default"], { titleAccess: this.props.trans.__('Close this dialog'), fontSize: "small", onClick: this._onClose }))),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_ResetRevertDialog__WEBPACK_IMPORTED_MODULE_4__.contentWrapperClass },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", null, isRevert
                    ? this.props.trans.__("These changes will be reverted. Only commit if you're sure you're okay losing these changes.")
                    : this.props.trans.__('All changes after commit %1 will be gone forever (hard reset). Are you sure?', shortCommit)),
                isRevert && (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_ResetRevertDialog__WEBPACK_IMPORTED_MODULE_4__.commitFormClass },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement(_CommitMessage__WEBPACK_IMPORTED_MODULE_6__.CommitMessage, { trans: this.props.trans, summary: this.state.summary, summaryPlaceholder: this._defaultSummary(), description: this.state.description, descriptionPlaceholder: this._defaultDescription(), setSummary: this._onSummaryChange, setDescription: this._onDescriptionChange })))),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material_DialogActions__WEBPACK_IMPORTED_MODULE_7__["default"], { className: _style_ResetRevertDialog__WEBPACK_IMPORTED_MODULE_4__.actionsWrapperClass },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { disabled: this.state.disabled, className: (0,typestyle__WEBPACK_IMPORTED_MODULE_2__.classes)(_style_ResetRevertDialog__WEBPACK_IMPORTED_MODULE_4__.buttonClass, _style_ResetRevertDialog__WEBPACK_IMPORTED_MODULE_4__.cancelButtonClass), type: "button", title: this.props.trans.__('Cancel changes'), value: "Cancel", onClick: this._onClose }),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { disabled: this.state.disabled, className: (0,typestyle__WEBPACK_IMPORTED_MODULE_2__.classes)(_style_ResetRevertDialog__WEBPACK_IMPORTED_MODULE_4__.buttonClass, _style_ResetRevertDialog__WEBPACK_IMPORTED_MODULE_4__.submitButtonClass), type: "button", title: this.props.trans.__('Submit changes'), value: "Submit", onClick: this._onSubmit }))));
    }
    /**
     * Reset the current branch on the provided commit
     *
     * @param hash Git commit hash
     */
    async _resetCommit(hash) {
        const id = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.emit(this.props.trans.__('Discarding changes…'), 'in-progress', { autoClose: false });
        try {
            await this.props.model.resetToCommit(hash);
            _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.update({
                id,
                message: this.props.trans.__('Successfully discarded changes.'),
                type: 'success',
                autoClose: 5000
            });
        }
        catch (error) {
            _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.update({
                id,
                message: this.props.trans.__('Failed to discard changes.'),
                type: 'error',
                ...(0,_notifications__WEBPACK_IMPORTED_MODULE_8__.showError)(new Error(`Failed to discard changes after ${hash.slice(0, 7)}: ${error}`), this.props.trans)
            });
        }
    }
    /**
     * Revert the provided commit.
     *
     * @param hash Git commit hash
     */
    async _revertCommit(hash) {
        const id = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.emit(this.props.trans.__('Reverting changes…'), 'in-progress', { autoClose: false });
        try {
            await this.props.model.revertCommit(this._commitMessage(), hash);
            _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.update({
                id,
                message: this.props.trans.__('Successfully reverted changes.'),
                type: 'success',
                autoClose: 5000
            });
        }
        catch (error) {
            _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.update({
                id,
                message: this.props.trans.__('Failed to revert changes.'),
                type: 'error',
                ...(0,_notifications__WEBPACK_IMPORTED_MODULE_8__.showError)(new Error(`Failed to revert ${hash.slice(0, 7)}: ${error}`), this.props.trans)
            });
        }
    }
    /**
     * Returns a default commit summary for reverting a commit.
     *
     * @returns default commit summary
     */
    _defaultSummary() {
        const summary = this.props.commit.commit_msg.split('\n')[0];
        return this.props.trans.__("Revert '%1'", summary);
    }
    /**
     * Returns a default commit description for reverting a commit.
     *
     * @returns default commit description
     */
    _defaultDescription() {
        return this.props.trans.__('This reverts commit %1', this.props.commit.commit);
    }
    /**
     * Returns a commit message for reverting a commit.
     *
     * @returns commit message
     */
    _commitMessage() {
        const summary = this.state.summary || this._defaultSummary();
        const desc = this.state.description || this._defaultDescription();
        return summary + '\n\n' + desc + '\n';
    }
    /**
     * Resets component state.
     */
    _reset() {
        this.setState({
            summary: '',
            description: '',
            disabled: false
        });
    }
}


/***/ }),

/***/ "./lib/components/SelectAllButton.js":
/*!*******************************************!*\
  !*** ./lib/components/SelectAllButton.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SelectAllButton: () => (/* binding */ SelectAllButton)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Action button component
 *
 * @param props Component properties
 */
const SelectAllButton = (props) => {
    const { className, onChange, checked } = props;
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", { type: "checkbox", className: className, onChange: onChange, style: { marginRight: '10px' }, checked: checked, "data-test-id": "SelectAllButton" }));
};


/***/ }),

/***/ "./lib/components/SinglePastCommitInfo.js":
/*!************************************************!*\
  !*** ./lib/components/SinglePastCommitInfo.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SinglePastCommitInfo: () => (/* binding */ SinglePastCommitInfo)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../style/icons */ "./lib/style/icons.js");
/* harmony import */ var _style_SinglePastCommitInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../style/SinglePastCommitInfo */ "./lib/style/SinglePastCommitInfo.js");
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ActionButton */ "./lib/components/ActionButton.js");
/* harmony import */ var _CommitDiff__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CommitDiff */ "./lib/components/CommitDiff.js");
/* harmony import */ var _ResetRevertDialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ResetRevertDialog */ "./lib/components/ResetRevertDialog.js");






/**
 * React component for rendering information about an individual commit.
 */
class SinglePastCommitInfo extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
    /**
     * Returns a React component for information about an individual commit.
     *
     * @param props - component properties
     * @returns React component
     */
    constructor(props) {
        super(props);
        /**
         * Callback invoked upon a clicking a button to revert changes.
         *
         * @param event - event object
         */
        this._onRevertClick = (event) => {
            event.stopPropagation();
            this.setState({
                resetRevertDialog: true,
                resetRevertAction: 'revert'
            });
        };
        /**
         * Callback invoked upon a clicking a button to reset changes.
         *
         * @param event - event object
         */
        this._onResetClick = (event) => {
            event.stopPropagation();
            this.setState({
                resetRevertDialog: true,
                resetRevertAction: 'reset'
            });
        };
        /**
         * Callback invoked upon closing a dialog to reset or revert changes.
         */
        this._onResetRevertDialogClose = () => {
            this.setState({
                resetRevertDialog: false
            });
        };
        this.state = {
            info: '',
            commitBody: '',
            numFiles: '',
            insertions: '',
            deletions: '',
            modifiedFiles: [],
            loadingState: 'loading',
            resetRevertDialog: false,
            resetRevertAction: 'reset'
        };
    }
    /**
     * Callback invoked immediately after mounting a component (i.e., inserting into a tree).
     */
    async componentDidMount() {
        try {
            const log = await this.props.model.detailedLog(this.props.commit.commit);
            if (log) {
                this.setState({
                    info: log.modified_file_note,
                    commitBody: log.commit_body,
                    numFiles: log.modified_files_count,
                    insertions: log.number_of_insertions,
                    deletions: log.number_of_deletions,
                    modifiedFiles: log.modified_files,
                    loadingState: 'success'
                });
            }
        }
        catch (err) {
            console.error(`Error while getting detailed log for commit ${this.props.commit.commit} and path ${this.props.model.pathRepository}`, err);
            this.setState({ loadingState: 'error' });
            return;
        }
    }
    /**
     * Renders the component.
     *
     * @returns React element
     */
    render() {
        if (this.state.loadingState === 'loading') {
            return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, "\u2026");
        }
        if (this.state.loadingState === 'error') {
            return react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, this.props.trans.__('Error loading commit data'));
        }
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", { className: _style_SinglePastCommitInfo__WEBPACK_IMPORTED_MODULE_1__.commitBodyClass }, this.state.commitBody),
            react__WEBPACK_IMPORTED_MODULE_0__.createElement(_CommitDiff__WEBPACK_IMPORTED_MODULE_2__.CommitDiff, { actions: react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null,
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_3__.ActionButton, { className: _style_SinglePastCommitInfo__WEBPACK_IMPORTED_MODULE_1__.actionButtonClass, icon: _style_icons__WEBPACK_IMPORTED_MODULE_4__.discardIcon, title: this.props.trans.__('Revert changes introduced by this commit'), onClick: this._onRevertClick }),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_3__.ActionButton, { className: _style_SinglePastCommitInfo__WEBPACK_IMPORTED_MODULE_1__.actionButtonClass, icon: _style_icons__WEBPACK_IMPORTED_MODULE_4__.rewindIcon, title: this.props.trans.__('Discard changes introduced *after* this commit (hard reset)'), onClick: this._onResetClick }),
                    react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ResetRevertDialog__WEBPACK_IMPORTED_MODULE_5__.ResetRevertDialog, { open: this.state.resetRevertDialog, action: this.state.resetRevertAction, model: this.props.model, commit: this.props.commit, onClose: this._onResetRevertDialogClose, trans: this.props.trans })), numFiles: this.state.numFiles, insertions: this.state.insertions, deletions: this.state.deletions, files: this.state.modifiedFiles, onOpenDiff: this.props.onOpenDiff, trans: this.props.trans })));
    }
}


/***/ }),

/***/ "./lib/components/StatusWidget.js":
/*!****************************************!*\
  !*** ./lib/components/StatusWidget.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StatusWidget: () => (/* binding */ StatusWidget),
/* harmony export */   addStatusBarWidget: () => (/* binding */ addStatusBarWidget)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/material */ "webpack/sharing/consume/default/@mui/material/@mui/material");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _commandsAndMenu__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../commandsAndMenu */ "./lib/commandsAndMenu.js");
/* harmony import */ var _style_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../style/icons */ "./lib/style/icons.js");
/* harmony import */ var _style_StatusWidget__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../style/StatusWidget */ "./lib/style/StatusWidget.js");
/* harmony import */ var _style_Toolbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../style/Toolbar */ "./lib/style/Toolbar.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils */ "./lib/utils.js");
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ActionButton */ "./lib/components/ActionButton.js");










class StatusWidget extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ReactWidget {
    /**
     * Returns a status bar widget.
     * @param trans - The language translator
     * @returns widget
     */
    constructor(model, trans) {
        super();
        /**
         * Boolean indicating whether the status widget is accepting updates.
         */
        this._locked = false;
        /**
         * Status string.
         */
        this._status = '';
        this._model = model;
        this._trans = trans;
        this.addClass('jp-git-StatusWidget');
    }
    /**
     * Sets the current status.
     */
    set status(text) {
        this._status = text;
        if (!this._locked) {
            this._animate();
        }
    }
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_2___default().createElement((react__WEBPACK_IMPORTED_MODULE_2___default().Fragment), null,
            react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.UseSignal, { signal: this._model.credentialsRequiredChanged, initialArgs: false }, (_, needsCredentials) => (react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Badge, { className: _style_StatusWidget__WEBPACK_IMPORTED_MODULE_4__.badgeClass, variant: "dot", invisible: !needsCredentials, "data-test-id": "git-credential-badge" },
                react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_5__.ActionButton, { className: (0,typestyle__WEBPACK_IMPORTED_MODULE_3__.classes)(_style_Toolbar__WEBPACK_IMPORTED_MODULE_6__.toolbarButtonClass, this._status !== 'idle'
                        ? _style_StatusWidget__WEBPACK_IMPORTED_MODULE_4__.statusAnimatedIconClass
                        : _style_StatusWidget__WEBPACK_IMPORTED_MODULE_4__.statusIconClass), icon: _style_icons__WEBPACK_IMPORTED_MODULE_7__.gitIcon, onClick: needsCredentials
                        ? async () => this._showGitOperationDialog()
                        : undefined, title: needsCredentials
                        ? `Git: ${this._trans.__('credentials required')}`
                        : `Git: ${this._trans.__(this._status)}` })))),
            react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.UseSignal, { signal: this._model.headChanged }, () => this._model.currentBranch && (react__WEBPACK_IMPORTED_MODULE_2___default().createElement("span", { className: _style_StatusWidget__WEBPACK_IMPORTED_MODULE_4__.currentBranchNameClass }, this._model.currentBranch.name)))));
    }
    async _showGitOperationDialog() {
        try {
            await (0,_commandsAndMenu__WEBPACK_IMPORTED_MODULE_8__.showGitOperationDialog)(this._model, _commandsAndMenu__WEBPACK_IMPORTED_MODULE_8__.Operation.Fetch, this._trans);
        }
        catch (error) {
            console.error('Encountered an error when fetching. Error:', error);
        }
    }
    /**
     * Locks the status widget to prevent updates.
     *
     * ## Notes
     *
     * -   This is used to throttle updates in order to prevent "flashing" messages.
     */
    async _animate() {
        this._locked = true;
        this.update();
        await (0,_utils__WEBPACK_IMPORTED_MODULE_9__.sleep)(500);
        this._locked = false;
        this.update();
    }
}
function addStatusBarWidget(statusBar, model, settings, trans) {
    // Add a status bar widget to provide Git status updates:
    const statusWidget = new StatusWidget(model, trans);
    statusBar.registerStatusItem('git-status', {
        align: 'left',
        item: statusWidget,
        isActive: Private.isStatusWidgetActive(settings),
        activeStateChanged: settings && settings.changed
    });
    const callback = Private.createEventCallback(statusWidget);
    model.taskChanged.connect(callback);
    statusWidget.disposed.connect(() => {
        model.taskChanged.disconnect(callback);
    });
}
/* eslint-disable no-inner-declarations */
var Private;
(function (Private) {
    /**
     * Returns a callback for updating a status widget upon receiving model events.
     *
     * @private
     * @param widget - status widget
     * @returns callback
     */
    function createEventCallback(widget) {
        return onEvent;
        /**
         * Callback invoked upon a model event.
         *
         * @private
         * @param model - extension model
         * @param event - event name
         */
        function onEvent(model, event) {
            let status;
            switch (event) {
                case 'empty':
                    status = 'idle';
                    break;
                case 'git:checkout':
                    status = 'checking out…';
                    break;
                case 'git:clone':
                    status = 'cloning repository…';
                    break;
                case 'git:commit:create':
                    status = 'committing changes…';
                    break;
                case 'git:commit:revert':
                    status = 'reverting changes…';
                    break;
                case 'git:init':
                    status = 'initializing repository…';
                    break;
                case 'git:merge':
                    status = 'merging…';
                    break;
                case 'git:pull':
                    status = 'pulling changes…';
                    break;
                case 'git:pushing':
                    status = 'pushing changes…';
                    break;
                case 'git:rebase':
                    status = 'rebasing…';
                    break;
                case 'git:rebase:resolve':
                    status = 'resolving rebase…';
                    break;
                case 'git:refresh':
                    status = 'refreshing…';
                    break;
                case 'git:reset:changes':
                    status = 'resetting changes…';
                    break;
                case 'git:reset:hard':
                    status = 'discarding changes…';
                    break;
                default:
                    if (/git:add:files/.test(event)) {
                        status = 'adding files…';
                    }
                    else {
                        status = 'working…';
                    }
                    break;
            }
            widget.status = status;
        }
    }
    Private.createEventCallback = createEventCallback;
    /**
     * Returns a callback which returns a boolean indicating whether the extension should display status updates.
     *
     * @private
     * @param settings - extension settings
     * @returns callback
     */
    function isStatusWidgetActive(settings) {
        return settings ? isActive : inactive;
        /**
         * Returns a boolean indicating that the extension should not display status updates.
         *
         * @private
         * @returns boolean indicating that the extension should not display status updates
         */
        function inactive() {
            return false;
        }
        /**
         * Returns a boolean indicating whether the extension should display status updates.
         *
         * @private
         * @returns boolean indicating whether the extension should display status updates
         */
        function isActive() {
            var _a;
            return ((_a = settings === null || settings === void 0 ? void 0 : settings.composite.displayStatus) !== null && _a !== void 0 ? _a : true);
        }
    }
    Private.isStatusWidgetActive = isStatusWidgetActive;
})(Private || (Private = {}));
/* eslint-enable no-inner-declarations */


/***/ }),

/***/ "./lib/components/TagMenu.js":
/*!***********************************!*\
  !*** ./lib/components/TagMenu.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TagMenu: () => (/* binding */ TagMenu)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_icons_material_Clear__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/icons-material/Clear */ "./node_modules/@mui/icons-material/Clear.js");
/* harmony import */ var _mui_material_List__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/List */ "./node_modules/@mui/material/List/List.js");
/* harmony import */ var _mui_material_ListItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material/ListItem */ "./node_modules/@mui/material/ListItem/ListItem.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_window__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-window */ "webpack/sharing/consume/default/react-window/react-window");
/* harmony import */ var react_window__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_window__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _notifications__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../notifications */ "./lib/notifications.js");
/* harmony import */ var _style_BranchMenu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../style/BranchMenu */ "./lib/style/BranchMenu.js");
/* harmony import */ var _style_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../style/icons */ "./lib/style/icons.js");
/* harmony import */ var _NewTagDialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./NewTagDialog */ "./lib/components/NewTagDialog.js");










const ITEM_HEIGHT = 24.8; // HTML element height for a single tag
const MIN_HEIGHT = 150; // Minimal HTML element height for the tags list
const MAX_HEIGHT = 400; // Maximal HTML element height for the tags list
/**
 * Callback invoked upon encountering an error when switching tags.
 *
 * @private
 * @param error - error
 * @param id - notificatin id
 * @param trans - Translation object
 */
function onTagError(error, id, trans) {
    if (error.message.includes('following files would be overwritten')) {
        // Empty log message to hide the executing alert
        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.dismiss(id);
        (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
            title: trans.__('Unable to checkout tag'),
            body: (react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null,
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", null, trans.__('Your changes to the following files would be overwritten by switching:')),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material_List__WEBPACK_IMPORTED_MODULE_3__["default"], null, error.message.split('\n').slice(1, -3).map(renderFileName)),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, trans.__('Please commit, stash, or discard your changes before you checkout tags.')))),
            buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({ label: trans.__('Dismiss') })]
        });
    }
    else {
        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.update({
            id,
            message: trans.__('Failed to checkout tag.'),
            type: 'error',
            ...(0,_notifications__WEBPACK_IMPORTED_MODULE_4__.showError)(error, trans)
        });
    }
}
/**
 * Renders a file name.
 *
 * @private
 * @param filename - file name
 * @returns React element
 */
function renderFileName(filename) {
    return react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material_ListItem__WEBPACK_IMPORTED_MODULE_5__["default"], { key: filename }, filename);
}
/**
 * React component for rendering a tag menu.
 */
class TagMenu extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
    /**
     * Returns a React component for rendering a tag menu.
     *
     * @param props - component properties
     * @returns React component
     */
    constructor(props) {
        super(props);
        /**
         * Renders a menu item.
         *
         * @param props Row properties
         * @returns React element
         */
        this._renderItem = (props) => {
            const { data, index, style } = props;
            const tag = data[index];
            return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material_ListItem__WEBPACK_IMPORTED_MODULE_5__["default"], { button: true, title: this.props.trans.__('Checkout to tag: %1', tag.name), className: _style_BranchMenu__WEBPACK_IMPORTED_MODULE_6__.listItemClass, onClick: this._onTagClickFactory(tag.name), style: style },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement(_style_icons__WEBPACK_IMPORTED_MODULE_7__.tagIcon.react, { className: _style_BranchMenu__WEBPACK_IMPORTED_MODULE_6__.listItemIconClass, tag: "span" }),
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", { className: _style_BranchMenu__WEBPACK_IMPORTED_MODULE_6__.nameClass }, tag.name)));
        };
        /**
         * Callback invoked upon a change to the menu filter.
         *
         * @param event - event object
         */
        this._onFilterChange = (event) => {
            this.setState({
                filter: event.target.value
            });
        };
        /**
         * Callback invoked to reset the menu filter.
         */
        this._resetFilter = () => {
            this.setState({
                filter: ''
            });
        };
        /**
         * Callback invoked upon clicking a button to create a new tag.
         *
         * @param event - event object
         */
        this._onNewTagClick = () => {
            if (!this.props.branching) {
                (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)(this.props.trans.__('Creating a new tag is disabled'), this.props.trans.__('Error in creating new tag'));
                return;
            }
            this.setState({
                tagDialog: true
            });
        };
        /**
         * Callback invoked upon closing a dialog to create a new tag.
         */
        this._onNewTagDialogClose = () => {
            this.setState({
                tagDialog: false
            });
        };
        this.state = {
            filter: '',
            tagDialog: false
        };
    }
    /**
     * Renders the component.
     *
     * @returns React element
     */
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_BranchMenu__WEBPACK_IMPORTED_MODULE_6__.wrapperClass },
            this._renderFilter(),
            this._renderTagList(),
            this._renderNewTagDialog()));
    }
    /**
     * Renders a tag input filter.
     *
     * @returns React element
     */
    _renderFilter() {
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_BranchMenu__WEBPACK_IMPORTED_MODULE_6__.filterWrapperClass },
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", { className: _style_BranchMenu__WEBPACK_IMPORTED_MODULE_6__.filterClass },
                react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { className: _style_BranchMenu__WEBPACK_IMPORTED_MODULE_6__.filterInputClass, type: "text", onChange: this._onFilterChange, value: this.state.filter, placeholder: this.props.trans.__('Filter'), title: this.props.trans.__('Filter tag menu') }),
                this.state.filter ? (react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", { className: _style_BranchMenu__WEBPACK_IMPORTED_MODULE_6__.filterClearClass },
                    react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_icons_material_Clear__WEBPACK_IMPORTED_MODULE_8__["default"], { titleAccess: this.props.trans.__('Clear the current filter'), fontSize: "small", onClick: this._resetFilter }))) : null),
            react__WEBPACK_IMPORTED_MODULE_1__.createElement("input", { className: _style_BranchMenu__WEBPACK_IMPORTED_MODULE_6__.newBranchButtonClass, type: "button", title: this.props.trans.__('Create a new tag'), value: this.props.trans.__('New Tag'), onClick: this._onNewTagClick })));
    }
    /**
     * Renders list of tags.
     *
     * @returns React element
     */
    _renderTagList() {
        // Perform a "simple" filter... (TODO: consider implementing fuzzy filtering)
        const filter = this.state.filter;
        const tags = this.props.tagsList.filter(tag => !filter || tag.name.includes(filter));
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_window__WEBPACK_IMPORTED_MODULE_2__.FixedSizeList, { height: Math.min(Math.max(MIN_HEIGHT, tags.length * ITEM_HEIGHT), MAX_HEIGHT), itemCount: tags.length, itemData: tags, itemKey: (index, data) => data[index].name, itemSize: ITEM_HEIGHT, style: { overflowX: 'hidden', paddingTop: 0, paddingBottom: 0 }, width: 'auto' }, this._renderItem));
    }
    /**
     * Renders a dialog for creating a new tag.
     *
     * @returns React element
     */
    _renderNewTagDialog() {
        const isSingleCommit = false;
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_NewTagDialog__WEBPACK_IMPORTED_MODULE_9__.NewTagDialogBox, { pastCommits: this.props.pastCommits, model: this.props.model, trans: this.props.trans, open: this.state.tagDialog, onClose: this._onNewTagDialogClose, isSingleCommit: isSingleCommit }));
    }
    /**
     * Returns a callback which is invoked upon clicking a tag.
     *
     * @param tag - tag
     * @returns callback
     */
    _onTagClickFactory(tag) {
        /**
         * Callback invoked upon clicking a tag.
         *
         * @private
         * @param event - event object
         * @returns promise which resolves upon attempting to switch tags
         */
        const onClick = async () => {
            if (!this.props.branching) {
                (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)(this.props.trans.__('Checkout tags is disabled'), this.props.trans.__('The repository contains files with uncommitted changes. Please commit or discard these changes before switching to a tag.'));
                return;
            }
            const id = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.emit(this.props.trans.__('Checking tag out…'), 'in-progress', { autoClose: false });
            try {
                await this.props.model.checkoutTag(tag);
            }
            catch (err) {
                return onTagError(err, id, this.props.trans);
            }
            _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.update({
                id,
                message: this.props.trans.__('Tag checkout.'),
                type: 'success',
                autoClose: 5000
            });
        };
        return onClick;
    }
}


/***/ }),

/***/ "./lib/components/Toolbar.js":
/*!***********************************!*\
  !*** ./lib/components/Toolbar.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Toolbar: () => (/* binding */ Toolbar)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material */ "webpack/sharing/consume/default/@mui/material/@mui/material");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _notifications__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../notifications */ "./lib/notifications.js");
/* harmony import */ var _style_GitPanel__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../style/GitPanel */ "./lib/style/GitPanel.js");
/* harmony import */ var _style_Toolbar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../style/Toolbar */ "./lib/style/Toolbar.js");
/* harmony import */ var _style_icons__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../style/icons */ "./lib/style/icons.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../tokens */ "./lib/tokens.js");
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ActionButton */ "./lib/components/ActionButton.js");
/* harmony import */ var _BranchMenu__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./BranchMenu */ "./lib/components/BranchMenu.js");
/* harmony import */ var _TagMenu__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./TagMenu */ "./lib/components/TagMenu.js");














/**
 * React component for rendering a panel toolbar.
 */
class Toolbar extends react__WEBPACK_IMPORTED_MODULE_4__.Component {
    /**
     * Returns a React component for rendering a panel toolbar.
     *
     * @param props - component properties
     * @returns React component
     */
    constructor(props) {
        super(props);
        /**
         * Callback invoked upon clicking a button to pull the latest changes.
         *
         * @param event - event object
         * @returns a promise which resolves upon pulling the latest changes
         */
        this._onPullClick = async () => {
            await this.props.commands.execute(_tokens__WEBPACK_IMPORTED_MODULE_6__.CommandIDs.gitPull);
        };
        /**
         * Callback invoked upon clicking a button to push the latest changes.
         *
         * @param event - event object
         * @returns a promise which resolves upon pushing the latest changes
         */
        this._onPushClick = async () => {
            await this.props.commands.execute(_tokens__WEBPACK_IMPORTED_MODULE_6__.CommandIDs.gitPush);
        };
        /**
         * Callback invoked upon clicking a button to change the current branch.
         *
         * @param event - event object
         */
        this._onBranchClick = () => {
            // Toggle the branch menu:
            this.setState({
                branchMenu: !this.state.branchMenu
            });
        };
        /**
         * Callback invoked upon clicking a button to refresh the model.
         *
         * @param event - event object
         * @returns a promise which resolves upon refreshing the model
         */
        this._onRefreshClick = async () => {
            const id = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.emit(this.props.trans.__('Refreshing…'), 'in-progress', { autoClose: false });
            try {
                await this.props.model.refresh();
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.update({
                    id,
                    message: this.props.trans.__('Successfully refreshed.'),
                    type: 'success',
                    autoClose: 5000
                });
            }
            catch (error) {
                console.error(error);
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Notification.update({
                    id,
                    message: this.props.trans.__('Failed to refresh.'),
                    type: 'error',
                    ...(0,_notifications__WEBPACK_IMPORTED_MODULE_7__.showError)(error, this.props.trans)
                });
            }
        };
        this.state = {
            branchMenu: false,
            tab: 0
        };
    }
    /**
     * Renders the component.
     *
     * @returns React element
     */
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_4__.createElement("div", { className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_8__.toolbarClass },
            this._renderTopNav(),
            this._renderRepoMenu(),
            this._renderBranchMenu()));
    }
    /**
     * Renders the top navigation.
     *
     * @returns React element
     */
    _renderTopNav() {
        var _a;
        const activeBranch = this.props.branches.filter(branch => branch.is_current_branch);
        // FIXME whether the repository as a remote or not should be done through a call to `git remote`
        const hasRemote = this.props.branches.some(branch => branch.is_remote_branch);
        const hasUpstream = ((_a = activeBranch[0]) === null || _a === void 0 ? void 0 : _a.upstream) !== null;
        return (react__WEBPACK_IMPORTED_MODULE_4__.createElement("div", { className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_8__.toolbarNavClass },
            react__WEBPACK_IMPORTED_MODULE_4__.createElement("span", { className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_8__.spacer }),
            react__WEBPACK_IMPORTED_MODULE_4__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Badge, { className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_8__.badgeClass, variant: "dot", invisible: !hasRemote || this.props.nCommitsBehind === 0 },
                react__WEBPACK_IMPORTED_MODULE_4__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_9__.ActionButton, { className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_8__.toolbarButtonClass, disabled: !hasRemote, icon: _style_icons__WEBPACK_IMPORTED_MODULE_10__.pullIcon, onClick: hasRemote ? this._onPullClick : undefined, title: hasRemote
                        ? this.props.trans.__('Pull latest changes') +
                            (this.props.nCommitsBehind > 0
                                ? this.props.trans.__(' (behind by %1 commits)', this.props.nCommitsBehind)
                                : '')
                        : this.props.trans.__('No remote repository defined') })),
            react__WEBPACK_IMPORTED_MODULE_4__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Badge, { className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_8__.badgeClass, variant: "dot", invisible: !hasRemote || (this.props.nCommitsAhead === 0 && hasUpstream) },
                react__WEBPACK_IMPORTED_MODULE_4__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_9__.ActionButton, { className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_8__.toolbarButtonClass, disabled: !hasRemote, icon: _style_icons__WEBPACK_IMPORTED_MODULE_10__.pushIcon, onClick: hasRemote ? this._onPushClick : undefined, title: hasRemote
                        ? hasUpstream
                            ? this.props.trans.__('Push committed changes') +
                                (this.props.nCommitsAhead > 0
                                    ? this.props.trans.__(' (ahead by %1 commits)', this.props.nCommitsAhead)
                                    : '')
                            : this.props.trans.__('Publish branch')
                        : this.props.trans.__('No remote repository defined') })),
            react__WEBPACK_IMPORTED_MODULE_4__.createElement(_ActionButton__WEBPACK_IMPORTED_MODULE_9__.ActionButton, { className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_8__.toolbarButtonClass, icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.refreshIcon, onClick: this._onRefreshClick, title: this.props.trans.__('Refresh the repository to detect local and remote changes') })));
    }
    /**
     * Renders a repository menu.
     *
     * @returns React element
     */
    _renderRepoMenu() {
        const repositoryName = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.basename(this.props.repository || _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PageConfig.getOption('serverRoot')) || 'Jupyter Server Root';
        return (react__WEBPACK_IMPORTED_MODULE_4__.createElement("div", { className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_8__.toolbarMenuWrapperClass },
            react__WEBPACK_IMPORTED_MODULE_4__.createElement("button", { disabled: true, className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_8__.toolbarMenuButtonClass, title: this.props.trans.__('Current repository: %1', _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PageConfig.getOption('serverRoot') + '/' + this.props.repository) },
                react__WEBPACK_IMPORTED_MODULE_4__.createElement(_style_icons__WEBPACK_IMPORTED_MODULE_10__.desktopIcon.react, { tag: "span", className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_8__.toolbarMenuButtonIconClass }),
                react__WEBPACK_IMPORTED_MODULE_4__.createElement("div", { className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_8__.toolbarMenuButtonTitleWrapperClass },
                    react__WEBPACK_IMPORTED_MODULE_4__.createElement("p", { className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_8__.toolbarMenuButtonTitleClass }, this.props.trans.__('Current Repository')),
                    react__WEBPACK_IMPORTED_MODULE_4__.createElement("p", { className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_8__.toolbarMenuButtonSubtitleClass }, repositoryName)))));
    }
    /**
     * Renders a branch menu.
     *
     * @returns React element
     */
    _renderBranchMenu() {
        let branchTitle = '';
        if (this.props.model.pathRepository === null) {
            return null;
        }
        switch (this.props.model.status.state) {
            case _tokens__WEBPACK_IMPORTED_MODULE_6__.Git.State.CHERRY_PICKING:
                branchTitle = this.props.trans.__('Cherry picking in');
                break;
            case _tokens__WEBPACK_IMPORTED_MODULE_6__.Git.State.DETACHED:
                branchTitle = this.props.trans.__('Detached Head at');
                break;
            case _tokens__WEBPACK_IMPORTED_MODULE_6__.Git.State.MERGING:
                branchTitle = this.props.trans.__('Merging in');
                break;
            case _tokens__WEBPACK_IMPORTED_MODULE_6__.Git.State.REBASING:
                branchTitle = this.props.trans.__('Rebasing');
                break;
            default:
                branchTitle = this.props.trans.__('Current Branch');
        }
        return (react__WEBPACK_IMPORTED_MODULE_4__.createElement("div", { className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_8__.toolbarMenuWrapperClass },
            react__WEBPACK_IMPORTED_MODULE_4__.createElement("button", { className: (0,typestyle__WEBPACK_IMPORTED_MODULE_5__.classes)(_style_Toolbar__WEBPACK_IMPORTED_MODULE_8__.toolbarMenuButtonClass, _style_Toolbar__WEBPACK_IMPORTED_MODULE_8__.toolbarMenuButtonEnabledClass), title: this.props.trans.__('Manage branches and tags'), onClick: this._onBranchClick },
                react__WEBPACK_IMPORTED_MODULE_4__.createElement(_style_icons__WEBPACK_IMPORTED_MODULE_10__.branchIcon.react, { tag: "span", className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_8__.toolbarMenuButtonIconClass }),
                react__WEBPACK_IMPORTED_MODULE_4__.createElement("div", { className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_8__.toolbarMenuButtonTitleWrapperClass },
                    react__WEBPACK_IMPORTED_MODULE_4__.createElement("p", { className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_8__.toolbarMenuButtonTitleClass }, branchTitle),
                    react__WEBPACK_IMPORTED_MODULE_4__.createElement("p", { className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_8__.toolbarMenuButtonSubtitleClass }, this.props.currentBranch || '')),
                this.state.branchMenu ? (react__WEBPACK_IMPORTED_MODULE_4__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.caretUpIcon.react, { tag: "span", className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_8__.toolbarMenuButtonIconClass })) : (react__WEBPACK_IMPORTED_MODULE_4__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.caretDownIcon.react, { tag: "span", className: _style_Toolbar__WEBPACK_IMPORTED_MODULE_8__.toolbarMenuButtonIconClass }))),
            this.state.branchMenu ? this._renderTabs() : null));
    }
    _renderTabs() {
        return (react__WEBPACK_IMPORTED_MODULE_4__.createElement(react__WEBPACK_IMPORTED_MODULE_4__.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_4__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Tabs, { classes: {
                    root: _style_GitPanel__WEBPACK_IMPORTED_MODULE_11__.tabsClass,
                    indicator: _style_GitPanel__WEBPACK_IMPORTED_MODULE_11__.tabIndicatorClass
                }, value: this.state.tab, onChange: (event, tab) => {
                    this.setState({
                        tab: tab
                    });
                } },
                react__WEBPACK_IMPORTED_MODULE_4__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Tab, { classes: {
                        root: _style_GitPanel__WEBPACK_IMPORTED_MODULE_11__.tabClass,
                        selected: _style_GitPanel__WEBPACK_IMPORTED_MODULE_11__.selectedTabClass
                    }, title: this.props.trans.__('View branches'), label: this.props.trans.__('Branches'), disableFocusRipple: true, disableRipple: true }),
                react__WEBPACK_IMPORTED_MODULE_4__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Tab, { classes: {
                        root: _style_GitPanel__WEBPACK_IMPORTED_MODULE_11__.tabClass,
                        selected: _style_GitPanel__WEBPACK_IMPORTED_MODULE_11__.selectedTabClass
                    }, title: this.props.trans.__('View tags'), label: this.props.trans.__('Tags'), disableFocusRipple: true, disableRipple: true })),
            this.state.tab === 0 ? this._renderBranches() : this._renderTags()));
    }
    _renderBranches() {
        return (react__WEBPACK_IMPORTED_MODULE_4__.createElement(_BranchMenu__WEBPACK_IMPORTED_MODULE_12__.BranchMenu, { currentBranch: this.props.currentBranch || '', branches: this.props.branches, branching: this.props.branching, commands: this.props.commands, model: this.props.model, trans: this.props.trans }));
    }
    _renderTags() {
        return (react__WEBPACK_IMPORTED_MODULE_4__.createElement(_TagMenu__WEBPACK_IMPORTED_MODULE_13__.TagMenu, { pastCommits: this.props.pastCommits, tagsList: this.props.tagsList, model: this.props.model, branching: this.props.branching, trans: this.props.trans }));
    }
}


/***/ }),

/***/ "./lib/components/WarningBox.js":
/*!**************************************!*\
  !*** ./lib/components/WarningBox.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WarningBox: () => (/* binding */ WarningBox)
/* harmony export */ });
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mui/material */ "webpack/sharing/consume/default/@mui/material/@mui/material");
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_Card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/Card */ "./node_modules/@mui/material/Card/Card.js");
/* harmony import */ var _mui_material_CardHeader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material/CardHeader */ "./node_modules/@mui/material/CardHeader/CardHeader.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_CommitBox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../style/CommitBox */ "./lib/style/CommitBox.js");






/**
 * Warning box component.
 */
function WarningBox(props) {
    return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material_Card__WEBPACK_IMPORTED_MODULE_3__["default"], { classes: {
            root: (0,typestyle__WEBPACK_IMPORTED_MODULE_2__.classes)(_style_CommitBox__WEBPACK_IMPORTED_MODULE_4__.commitRoot, _style_CommitBox__WEBPACK_IMPORTED_MODULE_4__.dirtyStagedFilesWarningBoxClass)
        }, variant: "outlined" },
        react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material_CardHeader__WEBPACK_IMPORTED_MODULE_5__["default"], { className: _style_CommitBox__WEBPACK_IMPORTED_MODULE_4__.dirtyStagedFilesWarningBoxHeaderClass, avatar: props.headerIcon, title: props.title, disableTypography: true }),
        react__WEBPACK_IMPORTED_MODULE_1__.createElement(_mui_material__WEBPACK_IMPORTED_MODULE_0__.CardContent, { className: _style_CommitBox__WEBPACK_IMPORTED_MODULE_4__.dirtyStagedFilesWarningBoxContentClass }, props.content)));
}


/***/ }),

/***/ "./lib/components/diff/ImageDiff.js":
/*!******************************************!*\
  !*** ./lib/components/diff/ImageDiff.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImageDiffWidget: () => (/* binding */ ImageDiffWidget),
/* harmony export */   createImageDiff: () => (/* binding */ createImageDiff)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_material_Slider__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/material/Slider */ "./node_modules/@mui/material/Slider/Slider.js");
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material/styles */ "./node_modules/@mui/material/styles/styled.js");
/* harmony import */ var _mui_material_Tab__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material/Tab */ "./node_modules/@mui/material/Tab/Tab.js");
/* harmony import */ var _mui_material_Tabs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material/Tabs */ "./node_modules/@mui/material/Tabs/Tabs.js");
/* harmony import */ var filesize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! filesize */ "webpack/sharing/consume/default/filesize/filesize");
/* harmony import */ var filesize__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(filesize__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _style_ImageDiffStyle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../style/ImageDiffStyle */ "./lib/style/ImageDiffStyle.js");












const createImageDiff = async ({ model, toolbar, translator }) => {
    const widget = new ImageDiffWidget(model, (translator !== null && translator !== void 0 ? translator : _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator).load('jupyterlab_git'));
    await widget.ready;
    return widget;
};
const MODES = ['2-up', 'Swipe', 'Onion Skin'];
const IMAGE_FILE_TYPES = ['png', 'jpeg', 'jpg'];
const whichViewMode = (mode) => {
    const elements = {
        '2-up': TwoUp,
        Swipe,
        'Onion Skin': OnionSkin
    };
    return elements[mode];
};
const base64FileSize = (base64str) => {
    const n = 0.75 * base64str.length;
    return (0,filesize__WEBPACK_IMPORTED_MODULE_4__.filesize)(n);
};
const getFileType = (filename) => {
    return (filename.substring(filename.lastIndexOf('.') + 1, filename.length) ||
        filename);
};
const ImageDiff = ({ reference, referenceLabel, challenger, challengerLabel, mode, trans, fileType }) => {
    const [modeSelect, setModeSelect] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(mode ? mode : '2-up');
    const onTabChange = (0,react__WEBPACK_IMPORTED_MODULE_5__.useCallback)((event, tab) => {
        setModeSelect(MODES[tab]);
    }, [modeSelect]);
    const ImageDiffView = whichViewMode(modeSelect);
    return (react__WEBPACK_IMPORTED_MODULE_5__.createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_5__.createElement("div", { className: _style_ImageDiffStyle__WEBPACK_IMPORTED_MODULE_6__.labelsClass },
            react__WEBPACK_IMPORTED_MODULE_5__.createElement("span", { className: _style_ImageDiffStyle__WEBPACK_IMPORTED_MODULE_6__.referenceLabelClass }, referenceLabel),
            react__WEBPACK_IMPORTED_MODULE_5__.createElement("span", { className: _style_ImageDiffStyle__WEBPACK_IMPORTED_MODULE_6__.challengerLabelClass }, challengerLabel)),
        react__WEBPACK_IMPORTED_MODULE_5__.createElement(_mui_material_Tabs__WEBPACK_IMPORTED_MODULE_7__["default"], { classes: { root: _style_ImageDiffStyle__WEBPACK_IMPORTED_MODULE_6__.tabsClass, indicator: _style_ImageDiffStyle__WEBPACK_IMPORTED_MODULE_6__.tabIndicatorClass }, value: MODES.indexOf(modeSelect), onChange: onTabChange, variant: "fullWidth" },
            react__WEBPACK_IMPORTED_MODULE_5__.createElement(_mui_material_Tab__WEBPACK_IMPORTED_MODULE_8__["default"], { classes: {
                    root: _style_ImageDiffStyle__WEBPACK_IMPORTED_MODULE_6__.tabClass
                }, title: trans.__('View Image Diff in 2-up Mode'), label: trans.__('2-up'), disableFocusRipple: true, disableRipple: true }),
            react__WEBPACK_IMPORTED_MODULE_5__.createElement(_mui_material_Tab__WEBPACK_IMPORTED_MODULE_8__["default"], { classes: {
                    root: _style_ImageDiffStyle__WEBPACK_IMPORTED_MODULE_6__.tabClass
                }, title: trans.__('View Image Diff in Swipe Mode'), label: trans.__('Swipe'), disableFocusRipple: true, disableRipple: true }),
            react__WEBPACK_IMPORTED_MODULE_5__.createElement(_mui_material_Tab__WEBPACK_IMPORTED_MODULE_8__["default"], { classes: {
                    root: _style_ImageDiffStyle__WEBPACK_IMPORTED_MODULE_6__.tabClass
                }, title: trans.__('View Image Diff in Onion Skin Mode'), label: trans.__('Onion Skin'), disableFocusRipple: true, disableRipple: true })),
        react__WEBPACK_IMPORTED_MODULE_5__.createElement(ImageDiffView, { reference: reference, challenger: challenger, fileType: fileType })));
};
const TwoUp = ({ reference, challenger, fileType }) => {
    const [referDimensions, setReferDimensions] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)([100, 100]);
    const [challDimensions, setChallDimensions] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)([100, 100]);
    const [imageDimensions, setImageDimensions] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)([100, 100]);
    const handleReferLoad = (event) => {
        let width = event.currentTarget.naturalWidth;
        let height = event.currentTarget.naturalHeight;
        setReferDimensions([width, height]);
        width = Math.min(event.currentTarget.width, 400);
        height = Math.min(event.currentTarget.height, 400);
        setImageDimensions([width, height]);
    };
    const handleChallLoad = (event) => {
        let width = event.currentTarget.naturalWidth;
        let height = event.currentTarget.naturalHeight;
        setChallDimensions([width, height]);
        width = Math.min(event.currentTarget.width, 400);
        height = Math.min(event.currentTarget.height, 400);
        setImageDimensions([width, height]);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {
        if (!reference) {
            setReferDimensions([...challDimensions]);
        }
    }, [challDimensions]);
    (0,react__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {
        if (!challenger) {
            setChallDimensions([...referDimensions]);
        }
    }, [referDimensions]);
    return (react__WEBPACK_IMPORTED_MODULE_5__.createElement("div", { className: _style_ImageDiffStyle__WEBPACK_IMPORTED_MODULE_6__.twoUpView },
        react__WEBPACK_IMPORTED_MODULE_5__.createElement("div", { className: _style_ImageDiffStyle__WEBPACK_IMPORTED_MODULE_6__.imageCol },
            react__WEBPACK_IMPORTED_MODULE_5__.createElement("img", { className: `${_style_ImageDiffStyle__WEBPACK_IMPORTED_MODULE_6__.referenceImageClass} ${!reference ? _style_ImageDiffStyle__WEBPACK_IMPORTED_MODULE_6__.emptyRefImage : ''}`, src: `data:image/${fileType};base64,${reference}`, alt: 'Reference', onLoad: handleReferLoad, style: !reference
                    ? {
                        width: `${imageDimensions[0]}px`,
                        height: `${imageDimensions[1]}px`
                    }
                    : {} }),
            react__WEBPACK_IMPORTED_MODULE_5__.createElement("label", { htmlFor: _style_ImageDiffStyle__WEBPACK_IMPORTED_MODULE_6__.referenceImageClass }, `W: ${referDimensions[0]}px | H: ${referDimensions[1]}px | ${base64FileSize(reference)}`)),
        react__WEBPACK_IMPORTED_MODULE_5__.createElement("div", { className: _style_ImageDiffStyle__WEBPACK_IMPORTED_MODULE_6__.imageCol },
            react__WEBPACK_IMPORTED_MODULE_5__.createElement("img", { className: `${_style_ImageDiffStyle__WEBPACK_IMPORTED_MODULE_6__.challengerImageClass} ${!challenger ? _style_ImageDiffStyle__WEBPACK_IMPORTED_MODULE_6__.emptyChallImage : ''}`, src: `data:image/${fileType};base64,${challenger}`, alt: 'challenger', onLoad: handleChallLoad, style: !challenger
                    ? {
                        width: `${imageDimensions[0]}px`,
                        height: `${imageDimensions[1]}px`
                    }
                    : {} }),
            react__WEBPACK_IMPORTED_MODULE_5__.createElement("label", { htmlFor: _style_ImageDiffStyle__WEBPACK_IMPORTED_MODULE_6__.challengerImageClass }, `W: ${challDimensions[0]}px | H: ${challDimensions[1]}px | ${base64FileSize(challenger)}`))));
};
const CustomMUISlider = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_9__["default"])(_mui_material_Slider__WEBPACK_IMPORTED_MODULE_10__["default"])({
    color: 'var(--jp-brand-color1)',
    '& .MuiSlider-thumb': {
        backgroundColor: 'var(--jp-brand-color1)'
    }
});
const Slider_ = ({ value, onChange, width, reversed }) => {
    const circleClasses = reversed
        ? [_style_ImageDiffStyle__WEBPACK_IMPORTED_MODULE_6__.sliderChallengerCircle, _style_ImageDiffStyle__WEBPACK_IMPORTED_MODULE_6__.sliderReferenceCircle]
        : [_style_ImageDiffStyle__WEBPACK_IMPORTED_MODULE_6__.sliderReferenceCircle, _style_ImageDiffStyle__WEBPACK_IMPORTED_MODULE_6__.sliderChallengerCircle];
    return (react__WEBPACK_IMPORTED_MODULE_5__.createElement("div", { className: _style_ImageDiffStyle__WEBPACK_IMPORTED_MODULE_6__.slider },
        react__WEBPACK_IMPORTED_MODULE_5__.createElement("span", { className: circleClasses[0] }, "\u25CF"),
        react__WEBPACK_IMPORTED_MODULE_5__.createElement(CustomMUISlider, { style: { width: `${width + 10}px` }, value: value, onChange: onChange }),
        react__WEBPACK_IMPORTED_MODULE_5__.createElement("span", { className: circleClasses[1] }, "\u25CF")));
};
const Swipe = ({ reference, challenger, fileType }) => {
    const [sliderValue, setSliderValue] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(50);
    const [sliderWidth, setSliderWidth] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(0);
    const referenceImageRef = (0,react__WEBPACK_IMPORTED_MODULE_5__.useRef)(null);
    const challengerImageRef = (0,react__WEBPACK_IMPORTED_MODULE_5__.useRef)(null);
    const handleSliderChange = (event, newValue) => {
        if (typeof newValue === 'number') {
            setSliderValue(newValue);
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_5__.useLayoutEffect)(() => {
        const refWidth = reference ? referenceImageRef.current.offsetWidth : 0;
        const challWidth = challenger ? challengerImageRef.current.offsetWidth : 0;
        setSliderWidth(Math.max(refWidth, challWidth) - 10);
    }, []);
    return (react__WEBPACK_IMPORTED_MODULE_5__.createElement("div", { className: _style_ImageDiffStyle__WEBPACK_IMPORTED_MODULE_6__.swipeContainer },
        react__WEBPACK_IMPORTED_MODULE_5__.createElement(Slider_, { value: sliderValue, onChange: handleSliderChange, width: sliderWidth, reversed: true }),
        react__WEBPACK_IMPORTED_MODULE_5__.createElement("div", { className: _style_ImageDiffStyle__WEBPACK_IMPORTED_MODULE_6__.swipeBackground },
            react__WEBPACK_IMPORTED_MODULE_5__.createElement("img", { ref: referenceImageRef, src: `data:image/${fileType};base64,${reference}`, className: `${_style_ImageDiffStyle__WEBPACK_IMPORTED_MODULE_6__.swipeImage} ${_style_ImageDiffStyle__WEBPACK_IMPORTED_MODULE_6__.swipeReferenceImage} ${!reference ? _style_ImageDiffStyle__WEBPACK_IMPORTED_MODULE_6__.emptyRefImage : ''}`, style: {
                    clipPath: `polygon(0 0, ${sliderValue - 0.1}% 0, ${sliderValue - 0.1}% 100%, 0% 100%)`,
                    width: sliderWidth ? `${sliderWidth}px` : ''
                }, alt: "Reference" }),
            react__WEBPACK_IMPORTED_MODULE_5__.createElement("img", { ref: challengerImageRef, src: `data:image/${fileType};base64,${challenger}`, className: `${_style_ImageDiffStyle__WEBPACK_IMPORTED_MODULE_6__.swipeImage} ${_style_ImageDiffStyle__WEBPACK_IMPORTED_MODULE_6__.swipeChallengerImage} ${!challenger ? _style_ImageDiffStyle__WEBPACK_IMPORTED_MODULE_6__.emptyChallImage : ''}`, style: {
                    clipPath: `polygon(${sliderValue + 0.1}% 0, 100% 0, 100% 100%, ${sliderValue + 0.1}% 100%)`,
                    width: sliderWidth ? `${sliderWidth}px` : ''
                }, alt: "Challenger" }))));
};
const OnionSkin = ({ reference, challenger, fileType }) => {
    const [sliderValue, setSliderValue] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(50);
    const [sliderWidth, setSliderWidth] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(40);
    const referenceImageRef = (0,react__WEBPACK_IMPORTED_MODULE_5__.useRef)(null);
    const challengerImageRef = (0,react__WEBPACK_IMPORTED_MODULE_5__.useRef)(null);
    const handleSliderChange = (event, newValue) => {
        if (typeof newValue === 'number') {
            setSliderValue(newValue);
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_5__.useLayoutEffect)(() => {
        const refWidth = reference ? referenceImageRef.current.offsetWidth : 40;
        const challWidth = challenger
            ? challengerImageRef.current.offsetWidth
            : 40;
        setSliderWidth(Math.max(refWidth, challWidth) - 10);
    }, []);
    return (react__WEBPACK_IMPORTED_MODULE_5__.createElement("div", { className: _style_ImageDiffStyle__WEBPACK_IMPORTED_MODULE_6__.onionSkinContainer },
        react__WEBPACK_IMPORTED_MODULE_5__.createElement(Slider_, { value: sliderValue, onChange: handleSliderChange, width: sliderWidth }),
        react__WEBPACK_IMPORTED_MODULE_5__.createElement("div", { className: _style_ImageDiffStyle__WEBPACK_IMPORTED_MODULE_6__.onionSkinImageContainer },
            react__WEBPACK_IMPORTED_MODULE_5__.createElement("img", { src: `data:image/${fileType};base64,${reference}`, alt: "Reference", className: `${_style_ImageDiffStyle__WEBPACK_IMPORTED_MODULE_6__.onionSkinImage} ${_style_ImageDiffStyle__WEBPACK_IMPORTED_MODULE_6__.onionSkinReferenceImage} ${!reference ? _style_ImageDiffStyle__WEBPACK_IMPORTED_MODULE_6__.emptyRefImage : ''}`, style: !reference ? { width: `${sliderWidth}px` } : {}, ref: referenceImageRef }),
            react__WEBPACK_IMPORTED_MODULE_5__.createElement("img", { src: `data:image/${fileType};base64,${challenger}`, alt: "Challenger", className: `${_style_ImageDiffStyle__WEBPACK_IMPORTED_MODULE_6__.onionSkinImage} ${_style_ImageDiffStyle__WEBPACK_IMPORTED_MODULE_6__.onionSkinChallengerImage} ${!challenger ? _style_ImageDiffStyle__WEBPACK_IMPORTED_MODULE_6__.emptyChallImage : ''}`, style: { opacity: sliderValue / 100 }, ref: challengerImageRef }))));
};
class ImageDiffWidget extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_3__.Panel {
    constructor(model, translator) {
        super();
        this.addClass('jp-git-image-diff');
        const getReady = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__.PromiseDelegate();
        this._container = this.node;
        this._isReady = getReady.promise;
        this._model = model;
        this._trans = translator !== null && translator !== void 0 ? translator : _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator.load('jupyterlab_git');
        this.refresh()
            .then(() => {
            getReady.resolve();
        })
            .catch(reason => {
            console.error(this._trans.__('Failed to refresh Image diff.'), reason, reason === null || reason === void 0 ? void 0 : reason.traceback);
        });
    }
    /**
     * Diff model
     */
    get model() {
        return this._model;
    }
    /**
     * Promise which fulfills when the widget is ready.
     */
    get ready() {
        return this._isReady;
    }
    get isFileResolved() {
        // TODO
        return true;
    }
    async getResolvedFile() {
        // TODO
        return {};
    }
    async refresh() {
        try {
            const referenceLabel = this._model.reference.label;
            const challengerLabel = this._model.challenger.label;
            const [reference, challenger] = await Promise.all([
                this._model.reference.content(),
                this._model.challenger.content()
            ]);
            const fileType = getFileType(this._model.filename);
            if (!IMAGE_FILE_TYPES.includes(fileType)) {
                throw Error(`Image file format ${fileType} not supported. Only ${IMAGE_FILE_TYPES} file extensions are supported' by the image diff view.`);
            }
            const reactImageDiffWidget = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ReactWidget.create(react__WEBPACK_IMPORTED_MODULE_5__.createElement(ImageDiff, { reference: reference, referenceLabel: referenceLabel, challenger: challenger, challengerLabel: challengerLabel, mode: "2-up", trans: this._trans, fileType: fileType }));
            this.addClass(_style_ImageDiffStyle__WEBPACK_IMPORTED_MODULE_6__.imageDiffWidgetClass);
            this.addWidget(reactImageDiffWidget);
        }
        catch (reason) {
            this.showError(reason);
        }
    }
    /**
     * Display an error instead of the file diff
     *
     * @param error Error object
     */
    showError(error) {
        console.error(this._trans.__('Failed to load file diff.'), error, error === null || error === void 0 ? void 0 : error.traceback);
        while (this.widgets.length > 0) {
            this.widgets[0].dispose();
        }
        const msg = (error.message || error).replace('\n', '<br />');
        this.node.innerHTML = `<p style="color: unset" class="jp-git-diff-error">
      <span>${this._trans.__('Error Loading Image Diff:')}</span>
      <span class="jp-git-diff-error-message">${msg}</span>
    </p>`;
    }
}


/***/ }),

/***/ "./lib/components/diff/NotebookDiff.js":
/*!*********************************************!*\
  !*** ./lib/components/diff/NotebookDiff.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NotebookDiff: () => (/* binding */ NotebookDiff),
/* harmony export */   ROOT_CLASS: () => (/* binding */ ROOT_CLASS),
/* harmony export */   createNotebookDiff: () => (/* binding */ createNotebookDiff)
/* harmony export */ });
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var nbdime_lib_diff_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! nbdime/lib/diff/model */ "./node_modules/nbdime/lib/diff/model/index.js");
/* harmony import */ var nbdime_lib_diff_widget__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! nbdime/lib/diff/widget */ "./node_modules/nbdime/lib/diff/widget/index.js");
/* harmony import */ var nbdime_lib_diff_widget_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! nbdime/lib/diff/widget/common */ "./node_modules/nbdime/lib/diff/widget/common.js");
/* harmony import */ var nbdime_lib_merge_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! nbdime/lib/merge/model */ "./node_modules/nbdime/lib/merge/model/index.js");
/* harmony import */ var nbdime_lib_merge_widget__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! nbdime/lib/merge/widget */ "./node_modules/nbdime/lib/merge/widget/index.js");
/* harmony import */ var nbdime_lib_merge_widget_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! nbdime/lib/merge/widget/common */ "./node_modules/nbdime/lib/merge/widget/common.js");
/* harmony import */ var _git__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../git */ "./lib/git.js");
/**
 * Modified from nbdime
 * https://github.com/jupyter/nbdime/blob/master/packages/labextension/src/widget.ts
 */










/**
 * Class of the outermost widget, the draggable tab
 */
const NBDIME_CLASS = 'nbdime-Widget';
/**
 * Class of the root of the actual diff, the scroller element
 */
const ROOT_CLASS = 'nbdime-root';
/**
 * DOM class for whether or not to hide unchanged cells
 */
const HIDE_UNCHANGED_CLASS = 'jp-mod-hideUnchanged';
/**
 * Diff callback to be registered for notebook files.
 *
 * @param model Diff model
 * @param toolbar MainAreaWidget toolbar
 * @returns Diff notebook widget
 */
const createNotebookDiff = async ({ model, renderMime, toolbar, translator }) => {
    // Create the notebook diff view
    const trans = (translator !== null && translator !== void 0 ? translator : _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__.nullTranslator).load('jupyterlab_git');
    const diffWidget = new NotebookDiff(model, renderMime, trans);
    diffWidget.addClass('jp-git-diff-root');
    await diffWidget.ready;
    // Add elements in toolbar
    if (toolbar) {
        const checkbox = document.createElement('input');
        const label = document.createElement('label');
        checkbox.className = 'nbdime-hide-unchanged';
        checkbox.type = 'checkbox';
        checkbox.checked = true;
        label.appendChild(checkbox);
        label.appendChild(document.createElement('span')).textContent = trans.__('Hide unchanged cells');
        toolbar.addItem('hideUnchanged', new _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__.Widget({ node: label }));
        if (model.hasConflict) {
            // Move merge notebook controls in the toolbar
            toolbar.addItem('clear-outputs', diffWidget.nbdimeWidget.widgets[0]);
        }
        // Connect toolbar checkbox and notebook diff widget
        diffWidget.areUnchangedCellsHidden = checkbox.checked;
        checkbox.onchange = () => {
            diffWidget.areUnchangedCellsHidden = checkbox.checked;
        };
    }
    return diffWidget;
};
/**
 * NotebookDiff widget
 */
class NotebookDiff extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__.Panel {
    constructor(model, renderMime, translator) {
        super();
        this._areUnchangedCellsHidden = false;
        this._lastSerializeModel = null;
        const getReady = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__.PromiseDelegate();
        this._isReady = getReady.promise;
        this._model = model;
        this._renderMime = renderMime;
        this._trans = translator !== null && translator !== void 0 ? translator : _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__.nullTranslator.load('jupyterlab_git');
        this.addClass(NBDIME_CLASS);
        this.refresh()
            .then(() => {
            getReady.resolve();
        })
            .catch(reason => {
            console.error(this._trans.__('Failed to refresh Notebook diff.'), reason, reason === null || reason === void 0 ? void 0 : reason.traceback);
        });
    }
    /**
     * Whether the unchanged cells are hidden or not
     */
    get areUnchangedCellsHidden() {
        return this._areUnchangedCellsHidden;
    }
    set areUnchangedCellsHidden(v) {
        if (this._areUnchangedCellsHidden !== v) {
            Private.toggleShowUnchanged(this._scroller, this._hasConflict, this._areUnchangedCellsHidden);
            this._areUnchangedCellsHidden = v;
        }
    }
    /**
     * Helper to determine if a notebook merge should be shown.
     */
    get _hasConflict() {
        var _a;
        return (_a = this._model.hasConflict) !== null && _a !== void 0 ? _a : false;
    }
    /**
     * Diff model
     */
    get model() {
        return this._model;
    }
    /**
     * Nbdime notebook widget.
     */
    get nbdimeWidget() {
        return this._nbdWidget;
    }
    /**
     * Promise which fulfills when the widget is ready.
     */
    get ready() {
        return this._isReady;
    }
    /**
     * Checks if all conflicts have been resolved.
     *
     * @see https://github.com/jupyter/nbdime/blob/a74b538386d05e3e9c26753ad21faf9ff4d269d7/packages/webapp/src/app/save.ts#L2
     */
    get isFileResolved() {
        const widget = this.nbdimeWidget;
        this._lastSerializeModel = widget.model.serialize();
        const validated = widget.validateMerged(this._lastSerializeModel);
        return (JSON.stringify(this._lastSerializeModel) === JSON.stringify(validated));
    }
    /**
     * Gets the file model of a resolved merge conflict,
     * and rejects if unable to retrieve.
     *
     * Note: `isFileResolved` is assumed to not have been called,
     * or to have been called just before calling this method for caching purposes.
     */
    async getResolvedFile() {
        var _a;
        return Promise.resolve({
            format: 'json',
            type: 'notebook',
            content: (_a = this._lastSerializeModel) !== null && _a !== void 0 ? _a : this.nbdimeWidget.model.serialize()
        });
    }
    /**
     * Refresh diff
     *
     * Note: Update the content and recompute the diff
     */
    async refresh() {
        var _a, _b;
        if (!((_a = this._scroller) === null || _a === void 0 ? void 0 : _a.parent)) {
            while (this.widgets.length > 0) {
                this.widgets[0].dispose();
            }
            const header = Private.diffHeader(this._model.reference.label, this._model.challenger.label, this._hasConflict, this._trans.__('Common Ancestor'));
            this.addWidget(header);
            this._scroller = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__.Panel();
            this._scroller.addClass(ROOT_CLASS);
            this._scroller.node.tabIndex = -1;
            this.addWidget(this._scroller);
        }
        try {
            // ENH request content only if it changed
            const referenceContent = await this._model.reference.content();
            const challengerContent = await this._model.challenger.content();
            const baseContent = await ((_b = this._model.base) === null || _b === void 0 ? void 0 : _b.content());
            const createView = baseContent
                ? this.createMergeView.bind(this)
                : this.createDiffView.bind(this);
            this._nbdWidget = await createView(challengerContent, referenceContent, baseContent !== null && baseContent !== void 0 ? baseContent : '');
            while (this._scroller.widgets.length > 0) {
                this._scroller.widgets[0].dispose();
            }
            this._scroller.addWidget(this._nbdWidget);
            try {
                await this._nbdWidget.init();
                Private.markUnchangedRanges(this._scroller.node, this._hasConflict);
            }
            catch (reason) {
                // FIXME there is a bug in nbdime and init got reject due to recursion limit hit
                // console.error(`Failed to init notebook diff view: ${reason}`);
                // getReady.reject(reason);
                console.debug(this._trans.__('Failed to init notebook diff view: %1', reason));
                Private.markUnchangedRanges(this._scroller.node, this._hasConflict);
            }
        }
        catch (reason) {
            this.showError(reason);
        }
    }
    async createDiffView(challengerContent, referenceContent) {
        const data = await (0,_git__WEBPACK_IMPORTED_MODULE_9__.requestAPI)('diffnotebook', 'POST', {
            currentContent: challengerContent,
            previousContent: referenceContent
        });
        const model = new nbdime_lib_diff_model__WEBPACK_IMPORTED_MODULE_3__.NotebookDiffModel(data.base, data.diff);
        return new nbdime_lib_diff_widget__WEBPACK_IMPORTED_MODULE_4__.NotebookDiffWidget({ model, rendermime: this._renderMime });
    }
    async createMergeView(challengerContent, referenceContent, baseContent) {
        const data = await (0,_git__WEBPACK_IMPORTED_MODULE_9__.requestAPI)('diffnotebook', 'POST', {
            currentContent: challengerContent,
            previousContent: referenceContent,
            baseContent
        });
        const model = new nbdime_lib_merge_model__WEBPACK_IMPORTED_MODULE_6__.NotebookMergeModel(data.base, data.merge_decisions);
        return new nbdime_lib_merge_widget__WEBPACK_IMPORTED_MODULE_7__.NotebookMergeWidget({ model, rendermime: this._renderMime });
    }
    /**
     * Handle `'activate-request'` messages.
     */
    onActivateRequest(msg) {
        var _a;
        if ((_a = this._scroller) === null || _a === void 0 ? void 0 : _a.parent) {
            this._scroller.node.focus();
        }
    }
    /**
     * Display an error instead of the file diff
     *
     * @param error Error object
     */
    showError(error) {
        console.error(this._trans.__('Failed to load file diff.'), error, error === null || error === void 0 ? void 0 : error.traceback);
        while (this.widgets.length > 0) {
            this.widgets[0].dispose();
        }
        const msg = (error.message || error).replace('\n', '<br />');
        this.node.innerHTML = `<p class="jp-git-diff-error">
      <span>${this._trans.__('Error Loading Notebook Diff:')}</span>
      <span class="jp-git-diff-error-message">${msg}</span>
    </p>`;
    }
}
var Private;
(function (Private) {
    /**
     * Create a header widget for the diff view.
     */
    function diffHeader(localLabel, remoteLabel, hasConflict, baseLabel) {
        const bannerClass = hasConflict
            ? 'jp-git-merge-banner'
            : 'jp-git-diff-banner';
        const node = document.createElement('div');
        node.className = 'jp-git-diff-header';
        node.innerHTML = `<div class="${bannerClass}">
        <span>${localLabel}</span>
        ${hasConflict
            ? // Add extra space during notebook merge view
                `<span>${baseLabel}</span>`
            : ''}
        <span>${remoteLabel}</span>
      </div>`;
        return new _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__.Widget({ node });
    }
    Private.diffHeader = diffHeader;
    /**
     * Toggle whether to show or hide unchanged cells.
     *
     * This simply marks with a class, real work is done by CSS.
     */
    function toggleShowUnchanged(root, hasConflict, show) {
        const hiding = root.hasClass(HIDE_UNCHANGED_CLASS);
        if (show === undefined) {
            show = hiding;
        }
        else if (hiding !== show) {
            // Nothing to do
            return;
        }
        if (show) {
            root.removeClass(HIDE_UNCHANGED_CLASS);
        }
        else {
            markUnchangedRanges(root.node, hasConflict);
            root.addClass(HIDE_UNCHANGED_CLASS);
        }
        root.update();
    }
    Private.toggleShowUnchanged = toggleShowUnchanged;
    /**
     * Gets the chunk element of an added/removed cell, or the cell element for others
     * @param cellElement
     */
    function getChunkElement(cellElement) {
        if (!cellElement.parentElement ||
            !cellElement.parentElement.parentElement) {
            return cellElement;
        }
        const chunkCandidate = cellElement.parentElement.parentElement;
        if (chunkCandidate.classList.contains(nbdime_lib_diff_widget_common__WEBPACK_IMPORTED_MODULE_5__.CHUNK_PANEL_CLASS)) {
            return chunkCandidate;
        }
        return cellElement;
    }
    /**
     * Marks certain cells with
     */
    function markUnchangedRanges(root, hasConflict) {
        var _a;
        const CELL_CLASS = hasConflict ? nbdime_lib_merge_widget__WEBPACK_IMPORTED_MODULE_7__.CELLMERGE_CLASS : nbdime_lib_diff_widget__WEBPACK_IMPORTED_MODULE_4__.CELLDIFF_CLASS;
        const UNCHANGED_CLASS = hasConflict
            ? nbdime_lib_merge_widget_common__WEBPACK_IMPORTED_MODULE_8__.UNCHANGED_MERGE_CLASS
            : nbdime_lib_diff_widget_common__WEBPACK_IMPORTED_MODULE_5__.UNCHANGED_DIFF_CLASS;
        const NOTEBOOK_CLASS = hasConflict
            ? '.jp-Notebook-merge'
            : '.jp-Notebook-diff';
        const children = root.querySelectorAll(`.${CELL_CLASS}`);
        let rangeStart = -1;
        for (let i = 0; i < children.length; ++i) {
            const child = children[i];
            if (!child.classList.contains(UNCHANGED_CLASS)) {
                // Visible
                if (rangeStart !== -1) {
                    // Previous was hidden
                    const N = i - rangeStart;
                    getChunkElement(child).setAttribute('data-nbdime-NCellsHiddenBefore', N.toString());
                    rangeStart = -1;
                }
            }
            else if (rangeStart === -1) {
                rangeStart = i;
            }
        }
        if (rangeStart !== -1) {
            // Last element was part of a hidden range, need to mark
            // the last cell that will be visible.
            const N = children.length - rangeStart;
            if (rangeStart === 0) {
                // All elements were hidden, nothing to mark
                // Add info on root instead
                const tag = (_a = root.querySelector(NOTEBOOK_CLASS)) !== null && _a !== void 0 ? _a : root;
                tag.setAttribute('data-nbdime-AllCellsHidden', N.toString());
                return;
            }
            const lastVisible = children[rangeStart - 1];
            getChunkElement(lastVisible).setAttribute('data-nbdime-NCellsHiddenAfter', N.toString());
        }
    }
    Private.markUnchangedRanges = markUnchangedRanges;
})(Private || (Private = {}));


/***/ }),

/***/ "./lib/components/diff/PlainTextDiff.js":
/*!**********************************************!*\
  !*** ./lib/components/diff/PlainTextDiff.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PlainTextDiff: () => (/* binding */ PlainTextDiff),
/* harmony export */   createPlainTextDiff: () => (/* binding */ createPlainTextDiff)
/* harmony export */ });
/* harmony import */ var _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/codeeditor */ "webpack/sharing/consume/default/@jupyterlab/codeeditor");
/* harmony import */ var _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/codemirror */ "webpack/sharing/consume/default/@jupyterlab/codemirror");
/* harmony import */ var _jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var diff_match_patch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! diff-match-patch */ "webpack/sharing/consume/default/diff-match-patch/diff-match-patch");
/* harmony import */ var diff_match_patch__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(diff_match_patch__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var nbdime_lib_common_mergeview__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! nbdime/lib/common/mergeview */ "./node_modules/nbdime/lib/common/mergeview.js");
/* harmony import */ var nbdime_lib_diff_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! nbdime/lib/diff/model */ "./node_modules/nbdime/lib/diff/model/index.js");
/* harmony import */ var nbdime_lib_diff_range__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! nbdime/lib/diff/range */ "./node_modules/nbdime/lib/diff/range.js");









/**
 * Diff callback to be registered for plain-text files.
 *
 * @param model Diff model
 * @param toolbar MainAreaWidget toolbar
 * @returns PlainText diff widget
 */
const createPlainTextDiff = async ({ editorFactory, languageRegistry, model, toolbar, translator }) => {
    const widget = new PlainTextDiff({
        model,
        languageRegistry,
        editorFactory,
        trans: (translator !== null && translator !== void 0 ? translator : _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__.nullTranslator).load('jupyterlab_git')
    });
    await widget.ready;
    return widget;
};
/**
 * Plain Text Diff widget
 */
class PlainTextDiff extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_4__.Panel {
    constructor({ model, languageRegistry, trans, editorFactory }) {
        var _a, _b, _c;
        super();
        this._reference = null;
        this._challenger = null;
        this._base = null;
        this.addClass('jp-git-diff-root');
        this.addClass('nbdime-root');
        this.addWidget(new _lumino_widgets__WEBPACK_IMPORTED_MODULE_4__.Widget({
            node: PlainTextDiff.createHeader(model.reference.label, (_a = model.base) === null || _a === void 0 ? void 0 : _a.label, model.challenger.label)
        }));
        const getReady = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__.PromiseDelegate();
        this._isReady = getReady.promise;
        this._languageRegistry = languageRegistry !== null && languageRegistry !== void 0 ? languageRegistry : new _jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_1__.EditorLanguageRegistry();
        this._editorFactory =
            editorFactory !== null && editorFactory !== void 0 ? editorFactory : createEditorFactory(this._languageRegistry);
        this._model = model;
        this._trans = trans !== null && trans !== void 0 ? trans : _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__.nullTranslator.load('jupyterlab_git');
        // Load file content early
        Promise.all([
            this._model.reference.content(),
            this._model.challenger.content(),
            (_c = (_b = this._model.base) === null || _b === void 0 ? void 0 : _b.content()) !== null && _c !== void 0 ? _c : Promise.resolve(null)
        ])
            .then(([reference, challenger, base]) => {
            this._reference = reference;
            this._challenger = challenger;
            this._base = base;
            getReady.resolve();
        })
            .catch(reason => {
            this.showError(reason);
            getReady.resolve();
        });
    }
    /**
     * Helper to determine if three-way diff should be shown.
     */
    get _hasConflict() {
        var _a;
        return (_a = this._model.hasConflict) !== null && _a !== void 0 ? _a : false;
    }
    /**
     * Checks if the conflicted file has been resolved.
     */
    get isFileResolved() {
        return true;
    }
    /**
     * Diff model
     */
    get model() {
        return this._model;
    }
    /**
     * Promise which fulfills when the widget is ready.
     */
    get ready() {
        return this._isReady;
    }
    /**
     * Gets the file model of a resolved merge conflict,
     * and rejects if unable to retrieve.
     */
    getResolvedFile() {
        var _a, _b;
        const value = (_b = (_a = this._mergeView) === null || _a === void 0 ? void 0 : _a.getMergedValue()) !== null && _b !== void 0 ? _b : null;
        if (value !== null) {
            return Promise.resolve({
                type: 'file',
                format: 'text',
                content: value
            });
        }
        else {
            return Promise.reject(this._trans.__('Failed to get a valid file value.'));
        }
    }
    /**
     * Callback to create the diff widget once the widget
     * is attached so CodeMirror get proper size.
     */
    onAfterAttach() {
        this.ready
            .then(() => {
            if (this._challenger !== null && this._reference !== null) {
                this.createDiffView(this._challenger, this._reference, this._hasConflict ? this._base : null);
            }
        })
            .catch(reason => {
            this.showError(reason);
        });
    }
    /**
     * Refresh diff
     *
     * Note: Update the content and recompute the diff
     */
    async refresh() {
        var _a, _b;
        await this.ready;
        try {
            // Clear all
            this._mergeView.dispose();
            // ENH request content only if it changed
            if (this._reference !== null) {
                this._reference = await this._model.reference.content();
            }
            if (this._challenger !== null) {
                this._challenger = await this._model.challenger.content();
            }
            if (this._base !== null) {
                this._base = (_b = (await ((_a = this._model.base) === null || _a === void 0 ? void 0 : _a.content()))) !== null && _b !== void 0 ? _b : null;
            }
            this.createDiffView(this._challenger, this._reference, this._hasConflict ? this._base : null);
            this._challenger = null;
            this._reference = null;
            this._base = null;
        }
        catch (reason) {
            this.showError(reason);
        }
    }
    /**
     * Create wrapper node
     */
    static createHeader(...labels) {
        const bannerClass = labels[1] !== undefined ? 'jp-git-merge-banner' : 'jp-git-diff-banner';
        const head = document.createElement('div');
        head.classList.add(bannerClass);
        head.innerHTML = labels
            .filter(label => !!label)
            .map(label => `<span>${label}</span>`)
            .join('');
        return head;
    }
    /**
     * Create the Plain Text Diff view
     *
     * Note: baseContent will only be passed when displaying
     *       a three-way merge conflict.
     */
    async createDiffView(challengerContent, referenceContent, baseContent = null) {
        var _a, _b, _c, _d;
        if (!this._mergeView) {
            const mimetypes = (_d = (_b = (_a = this._languageRegistry.findByFileName(this._model.filename)) === null || _a === void 0 ? void 0 : _a.mime) !== null && _b !== void 0 ? _b : (_c = this._languageRegistry.findBest(this._model.filename)) === null || _c === void 0 ? void 0 : _c.mime) !== null && _d !== void 0 ? _d : _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_0__.IEditorMimeTypeService.defaultMimeType;
            const mimetype = Array.isArray(mimetypes) ? mimetypes[0] : mimetypes;
            let remote;
            let local = undefined;
            let merged = undefined;
            if (baseContent !== null) {
                remote = createStringDiffModel(baseContent, referenceContent);
                local = createStringDiffModel(baseContent, challengerContent);
                local.mimetype = mimetype;
                merged = (0,nbdime_lib_diff_model__WEBPACK_IMPORTED_MODULE_7__.createDirectStringDiffModel)(baseContent, baseContent);
                merged.mimetype = mimetype;
            }
            else {
                remote = createStringDiffModel(referenceContent, challengerContent);
            }
            remote.mimetype = mimetype;
            this._mergeView = (0,nbdime_lib_common_mergeview__WEBPACK_IMPORTED_MODULE_6__.createNbdimeMergeView)({
                remote,
                local,
                merged,
                // factory: this._editorFactory
                showBase: false
            });
            this._mergeView.addClass('jp-git-PlainText-diff');
            this.addWidget(this._mergeView);
        }
        return Promise.resolve();
    }
    /**
     * Display an error instead of the file diff
     *
     * @param error Error object
     */
    showError(error) {
        var _a;
        console.error(this._trans.__('Failed to load file diff.'), error, error === null || error === void 0 ? void 0 : error.traceback);
        const msg = (error.message || error).replace('\n', '<br />');
        while (this.widgets.length > 0) {
            const w = this.widgets[0];
            (_a = this.layout) === null || _a === void 0 ? void 0 : _a.removeWidget(w);
            w.dispose();
        }
        this.node.innerHTML = `<p class="jp-git-diff-error">
      <span>${this._trans.__('Error Loading File Diff:')}</span>
      <span class="jp-git-diff-error-message">${msg}</span>
    </p>`;
    }
}
/**
 * Diff status
 */
var DiffStatus;
(function (DiffStatus) {
    DiffStatus[DiffStatus["Equal"] = diff_match_patch__WEBPACK_IMPORTED_MODULE_5__.DIFF_EQUAL] = "Equal";
    DiffStatus[DiffStatus["Delete"] = diff_match_patch__WEBPACK_IMPORTED_MODULE_5__.DIFF_DELETE] = "Delete";
    DiffStatus[DiffStatus["Insert"] = diff_match_patch__WEBPACK_IMPORTED_MODULE_5__.DIFF_INSERT] = "Insert";
})(DiffStatus || (DiffStatus = {}));
/**
 * Pointer to the diff algorithm
 */
let dmp;
/**
 * Compute the diff between two strings.
 *
 * @param a Reference
 * @param b Challenger
 * @param ignoreWhitespace Whether to ignore white spaces or not
 * @returns Diff list
 */
function getDiff(a, b, ignoreWhitespace) {
    if (!dmp) {
        dmp = new diff_match_patch__WEBPACK_IMPORTED_MODULE_5__.diff_match_patch();
    }
    const diff = dmp.diff_main(a, b);
    dmp.diff_cleanupSemantic(diff);
    // The library sometimes leaves in empty parts, which confuse the algorithm
    for (let i = 0; i < diff.length; ++i) {
        const part = diff[i];
        if (ignoreWhitespace ? !/[^ \t]/.test(part[1]) : !part[1]) {
            diff.splice(i--, 1);
        }
        else if (i && diff[i - 1][0] === part[0]) {
            diff.splice(i--, 1);
            diff[i][1] += part[1];
        }
    }
    return diff;
}
/**
 * Create nbdime diff model from two strings.
 *
 * @param reference Reference text
 * @param challenger Challenger text
 * @param ignoreWhitespace Whether to ignore white spaces or not
 * @returns The nbdime diff model
 */
function createStringDiffModel(reference, challenger, ignoreWhitespace) {
    const diffs = getDiff(reference, challenger, ignoreWhitespace);
    const additions = [];
    const deletions = [];
    let referencePos = 0;
    let challengerPos = 0;
    diffs.forEach(([status, str]) => {
        switch (status) {
            case DiffStatus.Delete:
                deletions.push(new nbdime_lib_diff_range__WEBPACK_IMPORTED_MODULE_8__.DiffRangeRaw(referencePos, str.length));
                referencePos += str.length;
                break;
            case DiffStatus.Insert:
                additions.push(new nbdime_lib_diff_range__WEBPACK_IMPORTED_MODULE_8__.DiffRangeRaw(challengerPos, str.length));
                challengerPos += str.length;
                break;
            // Equal is not represented in nbdime
            case DiffStatus.Equal:
                referencePos += str.length;
                challengerPos += str.length;
                break;
        }
    });
    return new nbdime_lib_diff_model__WEBPACK_IMPORTED_MODULE_7__.StringDiffModel(reference, challenger, additions, deletions);
}
/**
 * Create a default editor factory.
 *
 * @returns Editor factory
 */
function createEditorFactory(languages) {
    const factory = new _jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_1__.CodeMirrorEditorFactory({
        extensions: new _jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_1__.EditorExtensionRegistry(),
        languages
    });
    return factory.newInlineEditor.bind(factory);
}


/***/ }),

/***/ "./lib/components/diff/PreviewMainAreaWidget.js":
/*!******************************************************!*\
  !*** ./lib/components/diff/PreviewMainAreaWidget.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PreviewMainAreaWidget: () => (/* binding */ PreviewMainAreaWidget)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);

class PreviewMainAreaWidget extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.MainAreaWidget {
    constructor(options) {
        var _a;
        super(options);
        if ((_a = options.isPreview) !== null && _a !== void 0 ? _a : true) {
            PreviewMainAreaWidget.disposePreviewWidget(PreviewMainAreaWidget.previewWidget);
            PreviewMainAreaWidget.previewWidget = this;
        }
    }
    /**
     * Dispose screen as a preview screen
     */
    static disposePreviewWidget(isPreview) {
        var _a;
        return isPreview && ((_a = PreviewMainAreaWidget.previewWidget) === null || _a === void 0 ? void 0 : _a.dispose());
    }
    /**
     * Pin the preview screen if user clicks on tab title
     */
    static pinWidget(tabPosition, tabBar, diffWidget) {
        // We need to wait for the tab node to be inserted in the DOM
        setTimeout(() => {
            // Get the most recent tab opened
            const tab = tabPosition >= 0 ? tabBar.contentNode.children[tabPosition] : null;
            const tabTitle = tab === null || tab === void 0 ? void 0 : tab.querySelector('.lm-TabBar-tabLabel');
            if (!tabTitle) {
                return;
            }
            tabTitle.classList.add('jp-git-tab-mod-preview');
            const onClick = () => {
                tabTitle.classList.remove('jp-git-tab-mod-preview');
                tabTitle.removeEventListener('click', onClick, true);
                if (PreviewMainAreaWidget.previewWidget === diffWidget) {
                    PreviewMainAreaWidget.previewWidget = null;
                }
            };
            tabTitle.addEventListener('click', onClick, true);
            diffWidget.disposed.connect(() => {
                tabTitle.removeEventListener('click', onClick, true);
            });
        }, 0);
    }
    /**
     * Callback just after the widget is attached to the DOM
     */
    onAfterAttach(msg) {
        super.onAfterAttach(msg);
        this.node.addEventListener('click', this._onClick.bind(this), false);
    }
    /**
     * Callback just before the widget is detached from the DOM
     */
    onBeforeDetach(msg) {
        this.node.removeEventListener('click', this._onClick.bind(this), false);
        super.onBeforeAttach(msg);
    }
    /**
     * Callback on click event in capture phase
     */
    _onClick() {
        PreviewMainAreaWidget.previewWidget = null;
    }
}
/**
 * Handle on the preview widget
 */
PreviewMainAreaWidget.previewWidget = null;



/***/ }),

/***/ "./lib/components/diff/model.js":
/*!**************************************!*\
  !*** ./lib/components/diff/model.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DiffModel: () => (/* binding */ DiffModel)
/* harmony export */ });
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Base DiffModel class
 */
class DiffModel {
    constructor(props) {
        this._isDisposed = false;
        this._challenger = props.challenger;
        this._filename = props.filename;
        this._reference = props.reference;
        this._repositoryPath = props.repositoryPath;
        this._base = props.base;
        this._changed = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_0__.Signal(this);
    }
    /**
     * A signal emitted when the model changed.
     *
     * Note: The signal is emitted for any set on reference or
     * on challenger change except for the content; i.e. the content
     * is not fetch to check if it changed.
     */
    get changed() {
        return this._changed;
    }
    /**
     * Helper to compare diff contents.
     */
    _didContentChange(a, b) {
        return (a.label !== b.label || a.source !== b.source || a.updateAt !== b.updateAt);
    }
    /**
     * Challenger description
     */
    get challenger() {
        return this._challenger;
    }
    set challenger(v) {
        const emitSignal = this._didContentChange(this._challenger, v);
        if (emitSignal) {
            this._challenger = v;
            this._changed.emit({ type: 'challenger' });
        }
    }
    /**
     * File to be compared
     *
     * Note: This path is relative to the repository path
     */
    get filename() {
        return this._filename;
    }
    /**
     * Reference description
     */
    get reference() {
        return this._reference;
    }
    set reference(v) {
        const emitSignal = this._didContentChange(this._reference, v);
        if (emitSignal) {
            this._reference = v;
            this._changed.emit({ type: 'reference' });
        }
    }
    /**
     * Git repository path
     *
     * Note: This path is relative to the server root
     */
    get repositoryPath() {
        return this._repositoryPath;
    }
    /**
     * Base description
     *
     * Note: The base diff content is only provided during
     * merge conflicts (three-way diff).
     */
    get base() {
        return this._base;
    }
    /**
     * Helper to check if the file has conflicts.
     */
    get hasConflict() {
        return this._base !== undefined;
    }
    /**
     * Boolean indicating whether the model has been disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * Dispose of the model.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._isDisposed = true;
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_0__.Signal.clearData(this);
    }
}


/***/ }),

/***/ "./lib/generateGraphData.js":
/*!**********************************!*\
  !*** ./lib/generateGraphData.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateGraphData: () => (/* binding */ generateGraphData)
/* harmony export */ });
const Node = (sha, offset, branch, routes, yOffset) => ({
    sha,
    dot: { lateralOffset: offset, branch },
    routes,
    yOffset
});
function remove(list, item) {
    list.splice(list.indexOf(item), 1);
    return list;
}
/**
 * Generate graph data.
 * @param commits a list of commit, which should have `sha`, `parents` properties.
 * @param getNodeHeight a callback to retrieve the height of the history node
 * @returns data nodes, a json list of
      [
        {
          sha,
          {offset, branch}, //dot
          [
            {from, to, branch},  // route 1
            {from, to, branch},  // route 2
            {from, to, branch},
          ] // routes
        } // node
      ],
 */
function generateGraphData(commits, getNodeHeight) {
    const nodes = [];
    const branchIndex = [0];
    const reserve = [];
    const branches = {};
    function getBranch(sha) {
        if (branches[sha] === null || branches[sha] === undefined) {
            branches[sha] = branchIndex[0];
            reserve.push(branchIndex[0]);
            branchIndex[0]++;
        }
        return branches[sha];
    }
    let currentYOffset = 25;
    commits.forEach((commit, index) => {
        let b, i;
        const branch = getBranch(commit.sha);
        const numParents = commit.parents.length;
        const offset = reserve.indexOf(branch);
        const routes = [];
        if (numParents === 1) {
            if (branches[commit.parents[0]] || branches[commit.parents[0]] === 0) {
                // create branch
                const iterable = reserve.slice(offset + 1);
                for (i = 0; i < iterable.length; i++) {
                    b = iterable[i];
                    routes.push({
                        from: i + offset + 1,
                        to: i + offset + 1 - 1,
                        branch: b
                    });
                }
                const iterable1 = reserve.slice(0, offset);
                for (i = 0; i < iterable1.length; i++) {
                    b = iterable1[i];
                    routes.push({ from: i, to: i, branch: b });
                }
                remove(reserve, branch);
                routes.push({
                    from: offset,
                    to: reserve.indexOf(branches[commit.parents[0]]),
                    branch
                });
            }
            else {
                // straight
                for (i = 0; i < reserve.length; i++) {
                    b = reserve[i];
                    routes.push({ from: i, to: i, branch: b });
                }
                branches[commit.parents[0]] = branch;
            }
        }
        else if (numParents === 2) {
            // merge branch
            branches[commit.parents[0]] = branch;
            for (i = 0; i < reserve.length; i++) {
                b = reserve[i];
                routes.push({ from: i, to: i, branch: b });
            }
            const otherBranch = getBranch(commit.parents[1]);
            routes.push({
                from: offset,
                to: reserve.indexOf(otherBranch),
                branch: otherBranch
            });
        }
        if (index - 1 >= 0) {
            currentYOffset += getNodeHeight(commits[index - 1].sha);
        }
        const node = Node(commit.sha, offset, branch, routes, currentYOffset);
        nodes.push(node);
    });
    return nodes;
}


/***/ }),

/***/ "./lib/git.js":
/*!********************!*\
  !*** ./lib/git.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AUTH_ERROR_MESSAGES: () => (/* binding */ AUTH_ERROR_MESSAGES),
/* harmony export */   requestAPI: () => (/* binding */ requestAPI)
/* harmony export */ });
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/services */ "webpack/sharing/consume/default/@jupyterlab/services");
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tokens */ "./lib/tokens.js");



/**
 * Array of Git Auth Error Messages
 */
const AUTH_ERROR_MESSAGES = [
    'Invalid username or password',
    'could not read Username',
    'could not read Password',
    'Authentication error'
];
/**
 * Call the API extension
 *
 * @param endPoint API REST end point for the extension; default ''
 * @param method HTML method; default 'GET'
 * @param body JSON object to be passed as body or null; default null
 * @param namespace API namespace; default 'git'
 * @returns The response body interpreted as JSON
 *
 * @throws {Git.GitResponseError} If the server response is not ok
 * @throws {ServerConnection.NetworkError} If the request cannot be made
 */
async function requestAPI(endPoint = '', method = 'GET', body = null, namespace = 'git') {
    // Make request to Jupyter API
    const settings = _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.makeSettings();
    const requestUrl = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(settings.baseUrl, namespace, // API Namespace
    endPoint);
    const init = {
        method,
        body: body ? JSON.stringify(body) : undefined
    };
    let response;
    try {
        response = await _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.makeRequest(requestUrl, init, settings);
    }
    catch (error) {
        throw new _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.NetworkError(error);
    }
    let data = await response.text();
    let isJSON = false;
    if (data.length > 0) {
        try {
            data = JSON.parse(data);
            isJSON = true;
        }
        catch (error) {
            console.log('Not a JSON response body.', response);
        }
    }
    if (!response.ok) {
        if (isJSON) {
            const { message, traceback, ...json } = data;
            throw new _tokens__WEBPACK_IMPORTED_MODULE_2__.Git.GitResponseError(response, message ||
                `Invalid response: ${response.status} ${response.statusText}`, traceback || '', json);
        }
        else {
            throw new _tokens__WEBPACK_IMPORTED_MODULE_2__.Git.GitResponseError(response, data);
        }
    }
    return data;
}


/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DiffModel: () => (/* reexport safe */ _components_diff_model__WEBPACK_IMPORTED_MODULE_11__.DiffModel),
/* harmony export */   Git: () => (/* reexport safe */ _tokens__WEBPACK_IMPORTED_MODULE_14__.Git),
/* harmony export */   IGitExtension: () => (/* reexport safe */ _tokens__WEBPACK_IMPORTED_MODULE_14__.IGitExtension),
/* harmony export */   NotebookDiff: () => (/* reexport safe */ _components_diff_NotebookDiff__WEBPACK_IMPORTED_MODULE_12__.NotebookDiff),
/* harmony export */   PlainTextDiff: () => (/* reexport safe */ _components_diff_PlainTextDiff__WEBPACK_IMPORTED_MODULE_13__.PlainTextDiff),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/application */ "webpack/sharing/consume/default/@jupyterlab/application");
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/codeeditor */ "webpack/sharing/consume/default/@jupyterlab/codeeditor");
/* harmony import */ var _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/docmanager */ "webpack/sharing/consume/default/@jupyterlab/docmanager");
/* harmony import */ var _jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/filebrowser */ "webpack/sharing/consume/default/@jupyterlab/filebrowser");
/* harmony import */ var _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jupyterlab/mainmenu */ "webpack/sharing/consume/default/@jupyterlab/mainmenu");
/* harmony import */ var _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jupyterlab/rendermime */ "webpack/sharing/consume/default/@jupyterlab/rendermime");
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jupyterlab/settingregistry */ "webpack/sharing/consume/default/@jupyterlab/settingregistry");
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jupyterlab/statusbar */ "webpack/sharing/consume/default/@jupyterlab/statusbar");
/* harmony import */ var _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _cloneCommand__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./cloneCommand */ "./lib/cloneCommand.js");
/* harmony import */ var _commandsAndMenu__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./commandsAndMenu */ "./lib/commandsAndMenu.js");
/* harmony import */ var _components_diff_ImageDiff__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./components/diff/ImageDiff */ "./lib/components/diff/ImageDiff.js");
/* harmony import */ var _components_diff_NotebookDiff__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/diff/NotebookDiff */ "./lib/components/diff/NotebookDiff.js");
/* harmony import */ var _components_StatusWidget__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./components/StatusWidget */ "./lib/components/StatusWidget.js");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./model */ "./lib/model.js");
/* harmony import */ var _server__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./server */ "./lib/server.js");
/* harmony import */ var _style_icons__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./style/icons */ "./lib/style/icons.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./tokens */ "./lib/tokens.js");
/* harmony import */ var _widgets_GitWidget__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./widgets/GitWidget */ "./lib/widgets/GitWidget.js");
/* harmony import */ var _jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jupyterlab/codemirror */ "webpack/sharing/consume/default/@jupyterlab/codemirror");
/* harmony import */ var _jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _components_diff_model__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/diff/model */ "./lib/components/diff/model.js");
/* harmony import */ var _components_diff_PlainTextDiff__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/diff/PlainTextDiff */ "./lib/components/diff/PlainTextDiff.js");

























/**
 * The default running sessions extension.
 */
const plugin = {
    id: '@jupyterlab/git:plugin',
    requires: [
        _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILayoutRestorer,
        _jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_10__.IEditorLanguageRegistry,
        _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_2__.IEditorServices,
        _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_4__.IDefaultFileBrowser,
        _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_6__.IRenderMimeRegistry,
        _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_7__.ISettingRegistry,
        _jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_3__.IDocumentManager
    ],
    optional: [_jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_5__.IMainMenu, _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_8__.IStatusBar, _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_9__.ITranslator],
    provides: _tokens__WEBPACK_IMPORTED_MODULE_14__.IGitExtension,
    activate,
    autoStart: true
};
/**
 * Export the plugin as default.
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([plugin, _cloneCommand__WEBPACK_IMPORTED_MODULE_15__.gitCloneCommandPlugin]);
/**
 * Activate the running plugin.
 */
async function activate(app, restorer, languageRegistry, editorServices, 
// Get a reference to the default file browser extension
// We don't use the current tracked browser because extension like jupyterlab-github
// or jupyterlab-gitlab are defining new filebrowsers that we don't support.
// And it is unlikely that another browser than the default will be used.
// Ref: https://github.com/jupyterlab/jupyterlab-git/issues/1014
fileBrowser, renderMime, settingRegistry, docmanager, mainMenu, statusBar, palette, translator) {
    let settings = undefined;
    let serverSettings;
    translator = translator !== null && translator !== void 0 ? translator : _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_9__.nullTranslator;
    const trans = translator.load('jupyterlab_git');
    // Attempt to load application settings
    try {
        settings = await settingRegistry.load(plugin.id);
    }
    catch (error) {
        console.error(trans.__('Failed to load settings for the Git Extension.\n%1', error));
    }
    try {
        serverSettings = await (0,_server__WEBPACK_IMPORTED_MODULE_16__.getServerSettings)(trans);
        const { frontendVersion, gitVersion, serverVersion } = serverSettings;
        // Version validation
        if (!gitVersion) {
            throw new Error(trans.__('git command not found - please ensure you have Git > 2 installed'));
        }
        else {
            const gitVersion_ = gitVersion.split('.');
            if (Number.parseInt(gitVersion_[0]) < 2) {
                throw new Error(trans.__('git command version must be > 2; got %1.', gitVersion));
            }
        }
        if (frontendVersion && frontendVersion !== serverVersion) {
            throw new Error(trans.__('The versions of the JupyterLab Git server frontend and backend do not match. ' +
                'The @jupyterlab/git frontend extension has version: %1 ' +
                'while the python package has version %2. ' +
                'Please install identical version of jupyterlab-git Python package and the @jupyterlab/git extension. Try running: pip install --upgrade jupyterlab-git', frontendVersion, serverVersion));
        }
    }
    catch (error) {
        // If we fall here, nothing will be loaded in the frontend.
        console.error(trans.__('Failed to load the jupyterlab-git server extension settings'), error);
        (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showErrorMessage)(trans.__('Failed to load the jupyterlab-git server extension'), error.message, [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.warnButton({ label: trans.__('Dismiss') })]);
        // @ts-expect-error unable to initialize the extension token.
        return null;
    }
    // Create the Git model
    const gitExtension = new _model__WEBPACK_IMPORTED_MODULE_17__.GitExtension(docmanager, app.docRegistry, settings);
    const onPathChanged = (model, change) => {
        gitExtension.pathRepository = app.serviceManager.contents.localPath(change.newValue);
        gitExtension.refreshBranch();
    };
    // Whenever we restore the application, sync the Git extension path
    Promise.all([app.restored, fileBrowser.model.restored]).then(() => {
        onPathChanged(fileBrowser.model, {
            name: 'path',
            newValue: fileBrowser.model.path,
            oldValue: ''
        });
    });
    // Whenever the file browser path changes, sync the Git extension path
    fileBrowser.model.pathChanged.connect(onPathChanged);
    const refreshBrowser = () => {
        fileBrowser.model.refresh();
    };
    // Whenever the `HEAD` of the Git repository changes, refresh the file browser
    gitExtension.headChanged.connect(refreshBrowser);
    // Whenever a user adds/renames/saves/deletes/modifies a file within the lab environment, refresh the Git status
    app.serviceManager.contents.fileChanged.connect(() => gitExtension.refreshStatus());
    // Provided we were able to load application settings, create the extension widgets
    if (settings) {
        // Add JupyterLab commands
        (0,_commandsAndMenu__WEBPACK_IMPORTED_MODULE_18__.addCommands)(app, gitExtension, editorServices.factoryService, languageRegistry, fileBrowser.model, settings, translator);
        // Create the Git widget sidebar
        const gitPlugin = new _widgets_GitWidget__WEBPACK_IMPORTED_MODULE_19__.GitWidget(gitExtension, settings, app.commands, fileBrowser.model, trans);
        gitPlugin.id = 'jp-git-sessions';
        gitPlugin.title.icon = _style_icons__WEBPACK_IMPORTED_MODULE_20__.gitIcon;
        gitPlugin.title.caption = 'Git';
        if (palette) {
            // Add the commands to the command palette
            const category = 'Git Operations';
            [
                _tokens__WEBPACK_IMPORTED_MODULE_14__.CommandIDs.gitToggleSimpleStaging,
                _tokens__WEBPACK_IMPORTED_MODULE_14__.CommandIDs.gitToggleDoubleClickDiff,
                _tokens__WEBPACK_IMPORTED_MODULE_14__.CommandIDs.gitOpenGitignore,
                _tokens__WEBPACK_IMPORTED_MODULE_14__.CommandIDs.gitInit,
                _tokens__WEBPACK_IMPORTED_MODULE_14__.CommandIDs.gitMerge,
                _tokens__WEBPACK_IMPORTED_MODULE_14__.CommandIDs.gitRebase,
                _tokens__WEBPACK_IMPORTED_MODULE_14__.CommandIDs.gitPush,
                _tokens__WEBPACK_IMPORTED_MODULE_14__.CommandIDs.gitPull,
                _tokens__WEBPACK_IMPORTED_MODULE_14__.CommandIDs.gitResetToRemote,
                _tokens__WEBPACK_IMPORTED_MODULE_14__.CommandIDs.gitManageRemote,
                _tokens__WEBPACK_IMPORTED_MODULE_14__.CommandIDs.gitTerminalCommand
            ].forEach(command => palette.addItem({ command, category }));
        }
        // Let the application restorer track the running panel for restoration of
        // application state (e.g. setting the running panel as the current side bar
        // widget).
        restorer.add(gitPlugin, 'git-sessions');
        // Rank has been chosen somewhat arbitrarily to give priority to the running
        // sessions widget in the sidebar.
        app.shell.add(gitPlugin, 'left', { rank: 200 });
        // Add a menu for the plugin
        if (mainMenu && app.version.split('.').slice(0, 2).join('.') < '3.1') {
            // Support JLab 3.0
            /*mainMenu.addMenu(createGitMenu(app.commands, trans), { rank: 60 });*/
            mainMenu.addMenu((0,_commandsAndMenu__WEBPACK_IMPORTED_MODULE_18__.createGitMenu)(app.commands, trans));
        }
        // Add the status bar widget
        if (statusBar) {
            (0,_components_StatusWidget__WEBPACK_IMPORTED_MODULE_21__.addStatusBarWidget)(statusBar, gitExtension, settings, trans);
        }
        // Add the context menu items for the default file browser
        (0,_commandsAndMenu__WEBPACK_IMPORTED_MODULE_18__.addFileBrowserContextMenu)(gitExtension, fileBrowser, app.serviceManager.contents, app.contextMenu, trans);
    }
    // Register diff providers
    gitExtension.registerDiffProvider('Nbdime', ['.ipynb'], (options) => (0,_components_diff_NotebookDiff__WEBPACK_IMPORTED_MODULE_12__.createNotebookDiff)({ ...options, renderMime }));
    gitExtension.registerDiffProvider('ImageDiff', ['.jpeg', '.jpg', '.png'], _components_diff_ImageDiff__WEBPACK_IMPORTED_MODULE_22__.createImageDiff);
    return gitExtension;
}


/***/ }),

/***/ "./lib/model.js":
/*!**********************!*\
  !*** ./lib/model.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BranchMarker: () => (/* binding */ BranchMarker),
/* harmony export */   GitExtension: () => (/* binding */ GitExtension),
/* harmony export */   Markers: () => (/* binding */ Markers),
/* harmony export */   getDiffProvider: () => (/* binding */ getDiffProvider)
/* harmony export */ });
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/docregistry */ "webpack/sharing/consume/default/@jupyterlab/docregistry");
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_polling__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/polling */ "webpack/sharing/consume/default/@lumino/polling");
/* harmony import */ var _lumino_polling__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_polling__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _git__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./git */ "./lib/git.js");
/* harmony import */ var _taskhandler__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./taskhandler */ "./lib/taskhandler.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tokens */ "./lib/tokens.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils */ "./lib/utils.js");









// Default refresh interval (in milliseconds) for polling the current Git status (NOTE: this value should be the same value as in the plugin settings schema):
const DEFAULT_REFRESH_INTERVAL = 3000; // ms
// Available diff providers
const DIFF_PROVIDERS = {};
/**
 * Get the diff provider for a filename
 * @param filename Filename to look for
 * @returns The diff provider callback or undefined
 */
function getDiffProvider(filename) {
    var _a, _b, _c;
    return (_c = DIFF_PROVIDERS[(_b = (_a = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PathExt.extname(filename)) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase()) !== null && _b !== void 0 ? _b : '']) === null || _c === void 0 ? void 0 : _c.factory;
}
/**
 * Class for creating a model for retrieving info from, and interacting with, a remote Git repository.
 */
class GitExtension {
    /**
     * Returns an extension model.
     *
     * @param app - frontend application
     * @param settings - plugin settings
     * @returns extension model
     */
    constructor(docmanager = null, docRegistry = null, settings) {
        /**
         * Fetch poll action.
         * This is blocked if Git credentials are required.
         */
        this._fetchRemotes = async () => {
            if (this.credentialsRequired) {
                return;
            }
            try {
                await this.fetch();
            }
            catch (error) {
                console.error('Failed to fetch remotes', error);
                if (_git__WEBPACK_IMPORTED_MODULE_5__.AUTH_ERROR_MESSAGES.some(errorMessage => error.message.indexOf(errorMessage) > -1)) {
                    this.credentialsRequired = true;
                }
            }
        };
        /**
         * Refresh model status through a Poll
         */
        this._refreshModel = async () => {
            await this._taskHandler.execute('git:refresh', async () => {
                try {
                    await this.refreshBranch();
                    await this.refreshTag();
                    await this.refreshStatus();
                    await this.refreshStash();
                    await this.checkRemoteChangeNotified();
                }
                catch (error) {
                    console.error('Failed to refresh git status', error);
                }
            });
        };
        /**
         * Standby test function for the refresh Poll
         *
         * Standby refresh if
         * - webpage is hidden
         * - not in a git repository
         * - standby condition is true
         *
         * @returns The test function
         */
        this._refreshStandby = () => {
            if (this.pathRepository === null || this._standbyCondition()) {
                return true;
            }
            return 'when-hidden';
        };
        this._status = {
            branch: null,
            remote: null,
            ahead: 0,
            behind: 0,
            state: _tokens__WEBPACK_IMPORTED_MODULE_6__.Git.State.DEFAULT,
            files: []
        };
        this._stash = [];
        this._pathRepository = null;
        this._branches = [];
        this._tagsList = [];
        this._currentBranch = null;
        this._isDisposed = false;
        this._markerCache = new Markers(() => this._markChanged.emit());
        this.__currentMarker = new BranchMarker(() => { });
        this._readyPromise = Promise.resolve();
        this._pendingReadyPromise = 0;
        this._standbyCondition = () => false;
        this._remoteChangedFiles = [];
        this._changeUpstreamNotified = [];
        this._selectedHistoryFile = null;
        this._hasDirtyFiles = false;
        this._credentialsRequired = false;
        this._lastAuthor = null;
        // Configurable
        this._statusForDirtyState = ['staged', 'partially-staged'];
        this._branchesChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__.Signal(this);
        this._tagsChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__.Signal(this);
        this._headChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__.Signal(this);
        this._markChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__.Signal(this);
        this._selectedHistoryFileChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__.Signal(this);
        this._repositoryChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__.Signal(this);
        this._stashChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__.Signal(this);
        this._statusChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__.Signal(this);
        this._remoteChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__.Signal(this);
        this._dirtyFilesStatusChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__.Signal(this);
        this._credentialsRequiredChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__.Signal(this);
        this._docmanager = docmanager;
        this._docRegistry = docRegistry;
        this._settings = settings || null;
        this._taskHandler = new _taskhandler__WEBPACK_IMPORTED_MODULE_7__.TaskHandler(this);
        // Initialize repository status
        this._clearStatus();
        const interval = DEFAULT_REFRESH_INTERVAL;
        this._statusPoll = new _lumino_polling__WEBPACK_IMPORTED_MODULE_3__.Poll({
            factory: this._refreshModel,
            frequency: {
                interval,
                backoff: true,
                max: 300 * 1000
            },
            standby: this._refreshStandby
        });
        this._fetchPoll = new _lumino_polling__WEBPACK_IMPORTED_MODULE_3__.Poll({
            auto: false,
            factory: this._fetchRemotes,
            frequency: {
                interval,
                backoff: true,
                max: 300 * 1000
            },
            standby: this._refreshStandby
        });
        if (settings) {
            settings.changed.connect(this._onSettingsChange, this);
            this._onSettingsChange(settings);
        }
    }
    /**
     * Branch list for the current repository.
     */
    get branches() {
        return this._branches;
    }
    /**
     * Tags list for the current repository.
     */
    get tagsList() {
        return this._tagsList;
    }
    /**
     * The current repository branch.
     */
    get currentBranch() {
        return this._currentBranch;
    }
    /**
     * Boolean indicating whether the model has been disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * Boolean indicating whether the model is ready.
     */
    get isReady() {
        return this._pendingReadyPromise === 0;
    }
    /**
     * Promise which fulfills when the model is ready.
     */
    get ready() {
        return this._readyPromise;
    }
    /**
     * Git repository path.
     *
     * ## Notes
     *
     * -   This is the full path of the top-level folder.
     * -   The return value is `null` if a repository path is not defined.
     */
    get pathRepository() {
        return this._pathRepository;
    }
    set pathRepository(v) {
        const change = {
            name: 'pathRepository',
            newValue: null,
            oldValue: this._pathRepository
        };
        if (v === null) {
            this._pendingReadyPromise += 1;
            this._readyPromise.then(() => {
                this._pathRepository = null;
                this._pendingReadyPromise -= 1;
                if (change.newValue !== change.oldValue) {
                    this.refresh().then(() => this._repositoryChanged.emit(change));
                }
            });
        }
        else {
            const currentReady = this._readyPromise;
            this._pendingReadyPromise += 1;
            const currentFolder = v;
            this._readyPromise = Promise.all([
                currentReady,
                this.showPrefix(currentFolder)
            ])
                .then(([_, path]) => {
                if (path !== null) {
                    // Remove relative path to get the Git repository root path
                    path = currentFolder.slice(0, Math.max(0, currentFolder.length - path.length));
                }
                change.newValue = this._pathRepository = path;
                if (change.newValue !== change.oldValue) {
                    this.refresh().then(() => this._repositoryChanged.emit(change));
                }
                this._pendingReadyPromise -= 1;
            })
                .catch(reason => {
                this._pendingReadyPromise -= 1;
                console.error(`Fail to find Git top level for path ${currentFolder}.\n${reason}`);
            });
        }
    }
    /**
     * Custom model refresh standby condition
     */
    get refreshStandbyCondition() {
        return this._standbyCondition;
    }
    set refreshStandbyCondition(v) {
        this._standbyCondition = v;
    }
    /**
     * Selected file for single file history
     */
    get selectedHistoryFile() {
        return this._selectedHistoryFile;
    }
    set selectedHistoryFile(file) {
        if (this._selectedHistoryFile !== file) {
            this._selectedHistoryFile = file;
            this._selectedHistoryFileChanged.emit(file);
        }
    }
    /**
     * Last author
     *
     */
    get lastAuthor() {
        return this._lastAuthor;
    }
    set lastAuthor(lastAuthor) {
        this._lastAuthor = lastAuthor;
    }
    /**
     * Git repository status
     */
    get status() {
        return this._status;
    }
    /**
     * A signal emitted when the branches of the Git repository changes.
     */
    get branchesChanged() {
        return this._branchesChanged;
    }
    /**
     * A signal emitted when the `HEAD` of the Git repository changes.
     */
    get headChanged() {
        return this._headChanged;
    }
    /**
     * A signal emitted when the list of the Git repository changes.
     */
    get tagsChanged() {
        return this._tagsChanged;
    }
    /**
     * A signal emitted when the current marking of the Git repository changes.
     */
    get markChanged() {
        return this._markChanged;
    }
    /**
     * A signal emitted when the current file selected for history of the Git repository changes.
     */
    get selectedHistoryFileChanged() {
        return this._selectedHistoryFileChanged;
    }
    /**
     *  A signal emitted when the Git stash changes.
     *
     */
    get stashChanged() {
        return this._stashChanged;
    }
    /**
     * The repository stash
     */
    get stash() {
        return this._stash;
    }
    /**
     * A signal emitted when the current Git repository changes.
     */
    get repositoryChanged() {
        return this._repositoryChanged;
    }
    /**
     * A signal emitted when the current status of the Git repository changes.
     */
    get statusChanged() {
        return this._statusChanged;
    }
    /**
     * A signal emitted whenever a model event occurs.
     */
    get taskChanged() {
        return this._taskHandler.taskChanged;
    }
    /**
     * A signal emitted when the Git repository remote changes.
     */
    get remoteChanged() {
        return this._remoteChanged;
    }
    /**
     * Boolean indicating whether there are dirty files
     * A dirty file is a file with unsaved changes that is staged in classical mode
     * or modified in simple mode.
     */
    get hasDirtyFiles() {
        return this._hasDirtyFiles;
    }
    set hasDirtyFiles(value) {
        if (this._hasDirtyFiles !== value) {
            this._hasDirtyFiles = value;
            this._dirtyFilesStatusChanged.emit(value);
        }
    }
    /**
     * A signal emitted indicating whether there are dirty (e.g., unsaved) staged files.
     * This signal is emitted when there is a dirty staged file but none previously,
     * and vice versa, when there are no dirty staged files but there were some previously.
     */
    get dirtyFilesStatusChanged() {
        return this._dirtyFilesStatusChanged;
    }
    /**
     * Boolean indicating whether credentials are required from the user.
     */
    get credentialsRequired() {
        return this._credentialsRequired;
    }
    set credentialsRequired(value) {
        if (this._credentialsRequired !== value) {
            this._credentialsRequired = value;
            this._credentialsRequiredChanged.emit(value);
        }
    }
    /**
     * A signal emitted whenever credentials are required, or are not required anymore.
     */
    get credentialsRequiredChanged() {
        return this._credentialsRequiredChanged;
    }
    /**
     * Get the current markers
     *
     * Note: This makes sure it always returns non null value
     */
    get _currentMarker() {
        if (this.pathRepository === null) {
            return new BranchMarker(() => { });
        }
        if (!this.__currentMarker) {
            this._setMarker(this.pathRepository, this._currentBranch ? this._currentBranch.name : '');
        }
        return this.__currentMarker;
    }
    /**
     * Add one or more files to the repository staging area.
     *
     * ## Notes
     *
     * -   If no filename is provided, all files are added.
     *
     * @param filename - files to add
     * @returns promise which resolves upon adding files to the repository staging area
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async add(...filename) {
        const path = await this._getPathRepository();
        await this._taskHandler.execute('git:add:files', async () => {
            await (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'add'), 'POST', {
                add_all: !filename,
                filename: filename || ''
            });
        });
        await this.refreshStatus();
    }
    /**
     * Match files status information based on a provided file path.
     *
     * If the file is tracked and has no changes, a StatusFile of unmodified will be returned.
     *
     * @param path the file path relative to the server root
     * @returns The file status or null if path repository is null or path not in repository
     */
    getFile(path) {
        var _a;
        if (this.pathRepository === null) {
            return null;
        }
        const fileStatus = ((_a = this._status) === null || _a === void 0 ? void 0 : _a.files)
            ? this._status.files.find(status => {
                return this.getRelativeFilePath(status.to) === path;
            })
            : null;
        if (!fileStatus) {
            const relativePath = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PathExt.relative('/' + this.pathRepository, '/' + path);
            if (relativePath.startsWith('../')) {
                return null;
            }
            else {
                return {
                    x: '',
                    y: '',
                    to: relativePath,
                    from: '',
                    is_binary: null,
                    status: 'unmodified',
                    type: this._resolveFileType(path)
                };
            }
        }
        else {
            return fileStatus;
        }
    }
    /**
     * Add all "unstaged" files to the repository staging area.
     *
     * @returns promise which resolves upon adding files to the repository staging area
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async addAllUnstaged() {
        const path = await this._getPathRepository();
        await this._taskHandler.execute('git:add:files:all_unstaged', async () => {
            await (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'add_all_unstaged'), 'POST');
        });
        await this.refreshStatus();
    }
    /**
     * Add all untracked files to the repository staging area.
     *
     * @returns promise which resolves upon adding files to the repository staging area
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async addAllUntracked() {
        const path = await this._getPathRepository();
        await this._taskHandler.execute('git:add:files:all_untracked', async () => {
            await (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'add_all_untracked'), 'POST');
        });
        await this.refreshStatus();
    }
    /**
     * Add a remote Git repository to the current repository.
     *
     * @param url - remote repository URL
     * @param name - remote name
     * @returns promise which resolves upon adding a remote
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async addRemote(url, name) {
        const path = await this._getPathRepository();
        await this._taskHandler.execute('git:add:remote', async () => {
            await (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'remote', 'add'), 'POST', {
                url,
                name
            });
        });
    }
    /**
     * Show remote repository for the current repository
     * @returns promise which resolves to a list of remote repositories
     */
    async getRemotes() {
        const path = await this._getPathRepository();
        const result = await this._taskHandler.execute('git:show:remote', async () => {
            return await (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'remote', 'show'), 'GET');
        });
        return result.remotes;
    }
    /**
     * Remove a remote repository by name
     * @param name name of remote to remove
     */
    async removeRemote(name) {
        const path = await this._getPathRepository();
        await this._taskHandler.execute('git:remove:remote', async () => {
            await (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'remote', name), 'DELETE');
        });
    }
    /**
     * Retrieve the repository commit log.
     *
     * ## Notes
     *
     * -  This API can be used to implicitly check if the current folder is a Git repository.
     *
     * @param count - number of commits to retrieve
     * @returns promise which resolves upon retrieving the repository commit log
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async allHistory(count = 25) {
        const path = await this._getPathRepository();
        return await this._taskHandler.execute('git:fetch:history', async () => {
            return await (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'all_history'), 'POST', {
                history_count: count
            });
        });
    }
    /**
     * Checkout a branch.
     *
     * ## Notes
     *
     * -   If a branch name is provided, checkout the provided branch (with or without creating it)
     * -   If a filename is provided, checkout the file, discarding all changes.
     * -   If nothing is provided, checkout all files, discarding all changes.
     *
     * TODO: Refactor into separate endpoints for each kind of checkout request
     *
     * @param options - checkout options
     * @returns promise which resolves upon performing a checkout
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async checkout(options) {
        const path = await this._getPathRepository();
        const body = {
            checkout_branch: false,
            new_check: false,
            branchname: '',
            startpoint: '',
            checkout_all: true,
            filename: ''
        };
        if (options !== undefined) {
            if (options.branchname) {
                body.branchname = options.branchname;
                body.checkout_branch = true;
                body.new_check = options.newBranch === true;
                if (options.newBranch) {
                    body.startpoint = options.startpoint || this._currentBranch.name;
                }
            }
            else if (options.filename) {
                body.filename = options.filename;
                body.checkout_all = false;
            }
        }
        const data = await this._taskHandler.execute('git:checkout', async () => {
            var _a;
            let changes;
            if (!body.new_check) {
                if (body.checkout_branch && !body.new_check) {
                    changes = await this._changedFiles(this._currentBranch.name, body.branchname);
                }
                else if (body.filename) {
                    changes = { files: [body.filename] };
                }
                else {
                    changes = await this._changedFiles('WORKING', 'HEAD');
                }
            }
            const d = await (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'checkout'), 'POST', body);
            (_a = changes === null || changes === void 0 ? void 0 : changes.files) === null || _a === void 0 ? void 0 : _a.forEach(file => this._revertFile(file));
            return d;
        });
        if (body.checkout_branch) {
            await this.refreshBranch();
        }
        else {
            await this.refreshStatus();
        }
        return data;
    }
    /**
     * Merge a branch into the current branch
     *
     * @param branch The branch to merge into the current branch
     */
    async merge(branch) {
        const path = await this._getPathRepository();
        return this._taskHandler.execute('git:merge', () => {
            return (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'merge'), 'POST', {
                branch
            });
        });
    }
    /**
     * Clone a repository.
     *
     * @param path - local path into which the repository will be cloned
     * @param url - Git repository URL
     * @param auth - remote repository authentication information
     * @param versioning - boolean flag of Git metadata (default true)
     * @param submodules - boolean flag of Git submodules (default false)
     * @returns promise which resolves upon cloning a repository
     *
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async clone(path, url, auth, versioning = true, submodules = false) {
        return await this._taskHandler.execute('git:clone', async () => {
            return await (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'clone'), 'POST', {
                clone_url: url,
                versioning: versioning,
                submodules: submodules,
                auth: auth
            });
        });
    }
    /**
     * Commit all staged file changes. If message is None, then the commit is amended
     *
     * @param message - commit message
     * @param amend - whether this is an amend commit
     * @param author - override the commit author specified in config
     * @returns promise which resolves upon committing file changes
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async commit(message = null, amend = false, author = null) {
        const path = await this._getPathRepository();
        await this._taskHandler.execute('git:commit:create', async () => {
            await (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'commit'), 'POST', {
                commit_msg: message,
                amend: amend,
                author: author !== null && author !== void 0 ? author : null
            });
        });
        await this.refresh();
    }
    /**
     * Get (or set) Git configuration options.
     *
     * @param options - configuration options to set
     * @returns promise which resolves upon either getting or setting configuration options
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async config(options) {
        const path = await this._getPathRepository();
        return await this._taskHandler.execute('git:config:' + (options ? 'set' : 'get'), async () => {
            if (options) {
                await (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'config'), 'POST', {
                    options
                });
            }
            else {
                return await (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'config'), 'POST');
            }
        });
    }
    /**
     * Delete a branch
     *
     * @param branchName Branch name
     * @returns promise which resolves when the branch has been deleted.
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async deleteBranch(branchName) {
        const path = await this._getPathRepository();
        await this._taskHandler.execute('git:branch:delete', async () => {
            return await (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'branch', 'delete'), 'POST', {
                branch: branchName
            });
        });
    }
    /**
     * Fetch commit information.
     *
     * @param hash - commit hash
     * @returns promise which resolves upon retrieving commit information
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async detailedLog(hash) {
        var _a;
        const path = await this._getPathRepository();
        const data = await this._taskHandler.execute('git:fetch:commit_log', async () => {
            return await (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'detailed_log'), 'POST', {
                selected_hash: hash
            });
        });
        data.modified_files = ((_a = data.modified_files) !== null && _a !== void 0 ? _a : []).map(f => {
            f.type = this._resolveFileType(f.modified_file_path);
            return f;
        });
        return data;
    }
    /**
     * Get the diff of two commits.
     * If no commit is provided, the diff of HEAD and INDEX is returned.
     * If the current commit (the commit to compare) is not provided,
     * the diff of the previous commit and INDEX is returned.
     *
     * @param previous - the commit to compare against
     * @param current - the commit to compare
     * @returns promise which resolves upon retrieving the diff
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async diff(previous, current) {
        var _a;
        const path = await this._getPathRepository();
        const data = await this._taskHandler.execute('git:diff', async () => {
            return await (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'diff'), 'POST', {
                previous,
                current
            });
        });
        data.result = ((_a = data.result) !== null && _a !== void 0 ? _a : []).map(f => {
            f.filetype = this._resolveFileType(f.filename);
            return f;
        });
        return data;
    }
    /**
     * Dispose of model resources.
     */
    dispose() {
        var _a;
        if (this.isDisposed) {
            return;
        }
        this._isDisposed = true;
        this._fetchPoll.dispose();
        this._statusPoll.dispose();
        this._taskHandler.dispose();
        (_a = this._settings) === null || _a === void 0 ? void 0 : _a.changed.disconnect(this._onSettingsChange, this);
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__.Signal.clearData(this);
    }
    /**
     * Ensure a .gitignore file exists
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     * @throws {Git.HiddenFile} If the file is hidden
     */
    async ensureGitignore() {
        var _a, _b;
        const path = await this._getPathRepository();
        await (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'ignore'), 'POST', {});
        try {
            await ((_a = this._docmanager) === null || _a === void 0 ? void 0 : _a.services.contents.get(`${path}/.gitignore`, {
                content: false
            }));
        }
        catch (e) {
            // If the previous request failed with a 404 error, it means hidden file cannot be accessed
            if (((_b = e.response) === null || _b === void 0 ? void 0 : _b.status) === 404) {
                throw new _tokens__WEBPACK_IMPORTED_MODULE_6__.Git.HiddenFile();
            }
        }
        this._openGitignore();
        await this.refreshStatus();
    }
    /**
     * Reads content of .gitignore file
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async readGitIgnore() {
        const path = await this._getPathRepository();
        return (await (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'ignore'), 'GET')).content;
    }
    /**
     * Overwrites content onto .gitignore file
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async writeGitIgnore(content) {
        const path = await this._getPathRepository();
        await (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'ignore'), 'POST', { content: content });
        await this.refreshStatus();
    }
    /**
     * Fetch to get ahead/behind status
     *
     * @param auth - remote authentication information
     * @returns promise which resolves upon fetching
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async fetch(auth) {
        const path = await this._getPathRepository();
        const data = this._taskHandler.execute('git:fetch:remote', async () => {
            return await (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'remote', 'fetch'), 'POST', {
                auth: auth
            });
        });
        return data;
    }
    /**
     * Return the path of a file relative to the Jupyter server root.
     *
     * ## Notes
     *
     * -   If no path is provided, returns the Git repository top folder relative path.
     * -   If no Git repository selected, returns `null`
     *
     * @param path - file path relative to the top folder of the Git repository
     * @returns relative path
     */
    getRelativeFilePath(path) {
        if (this.pathRepository === null) {
            return null;
        }
        return _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PathExt.join(this.pathRepository, path !== null && path !== void 0 ? path : '');
    }
    /**
     * Add an entry in .gitignore file
     *
     * @param filePath File to ignore
     * @param useExtension Whether to ignore the file or its extension
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     * @throws {Git.HiddenFile} If hidden files are not enabled
     */
    async ignore(filePath, useExtension) {
        var _a, _b;
        const path = await this._getPathRepository();
        await (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'ignore'), 'POST', {
            file_path: filePath,
            use_extension: useExtension
        });
        try {
            await ((_a = this._docmanager) === null || _a === void 0 ? void 0 : _a.services.contents.get(`${path}/.gitignore`, {
                content: false
            }));
        }
        catch (e) {
            // If the previous request failed with a 404 error, it means hidden file cannot be accessed
            if (((_b = e.response) === null || _b === void 0 ? void 0 : _b.status) === 404) {
                throw new _tokens__WEBPACK_IMPORTED_MODULE_6__.Git.HiddenFile();
            }
        }
        this._openGitignore();
        await this.refreshStatus();
    }
    /**
     * Initialize a new Git repository at a specified path.
     *
     * @param path - path at which initialize a Git repository
     * @returns promise which resolves upon initializing a Git repository
     *
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async init(path) {
        await this._taskHandler.execute('git:init', async () => {
            await (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'init'), 'POST');
        });
    }
    /**
     * Retrieve commit logs.
     *
     * @param count - number of commits
     * @returns promise which resolves upon retrieving commit logs
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async log(count = 25) {
        const path = await this._getPathRepository();
        return await this._taskHandler.execute('git:fetch:log', async () => {
            var _a;
            try {
                return await (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'log'), 'POST', {
                    history_count: count,
                    follow_path: (_a = this.selectedHistoryFile) === null || _a === void 0 ? void 0 : _a.to
                });
            }
            catch (error) {
                return { code: 1 };
            }
        });
    }
    /**
     * Fetch changes from a remote repository.
     *
     * @param auth - remote authentication information
     * @returns promise which resolves upon fetching changes
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async pull(auth) {
        var _a, _b;
        const path = await this._getPathRepository();
        const previousHead = (_a = this._currentBranch) === null || _a === void 0 ? void 0 : _a.top_commit;
        const data = await this._taskHandler.execute('git:pull', async () => {
            var _a;
            return await (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'pull'), 'POST', {
                auth: auth,
                cancel_on_conflict: ((_a = this._settings) === null || _a === void 0 ? void 0 : _a.composite['cancelPullMergeConflict']) || false
            });
        });
        const changes = await this._changedFiles(previousHead, 'HEAD');
        (_b = changes === null || changes === void 0 ? void 0 : changes.files) === null || _b === void 0 ? void 0 : _b.forEach(file => this._revertFile(file));
        await this.refreshBranch(); // Will emit headChanged if required
        return data;
    }
    /**
     * Push local changes to a remote repository.
     *
     * @param auth - remote authentication information
     * @param force - whether or not to force the push
     * @returns promise which resolves upon pushing changes
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async push(auth, force = false, remote) {
        const path = await this._getPathRepository();
        const data = this._taskHandler.execute('git:push', async () => {
            return await (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'push'), 'POST', {
                auth: auth,
                force: force,
                remote
            });
        });
        this.refreshBranch();
        return data;
    }
    /**
     * Rebase the current branch onto the provided one.
     *
     * @param branch to rebase onto
     * @returns promise which resolves upon rebase action
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async rebase(branch) {
        const path = await this._getPathRepository();
        return this._taskHandler.execute('git:rebase', () => {
            return (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'rebase'), 'POST', {
                branch
            });
        });
    }
    /**
     * Resolve in progress rebase.
     *
     * @param action to perform
     * @returns promise which resolves upon rebase action
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async resolveRebase(action) {
        const path = await this._getPathRepository();
        return this._taskHandler.execute('git:rebase:resolve', () => (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'rebase'), 'POST', { action }));
    }
    /**
     * Refresh the repository.
     *
     * @returns promise which resolves upon refreshing the repository
     */
    async refresh() {
        await this._statusPoll.refresh();
        await this._statusPoll.tick;
    }
    /**
     * Refresh the list of repository branches.
     *
     * Emit headChanged if the branch or its top commit changes
     *
     * @returns promise which resolves upon refreshing repository branches
     */
    async refreshBranch() {
        var _a, _b, _c, _d, _e;
        try {
            const data = await this._taskHandler.execute('git:refresh:branches', async () => {
                return await this._branch();
            });
            let headChanged = false;
            if (!this._currentBranch || !data) {
                headChanged = this._currentBranch !== data.current_branch; // Object comparison is not working
            }
            else {
                headChanged =
                    this._currentBranch.name !== ((_a = data.current_branch) === null || _a === void 0 ? void 0 : _a.name) ||
                        this._currentBranch.top_commit !== ((_b = data.current_branch) === null || _b === void 0 ? void 0 : _b.top_commit);
            }
            const branchesChanged = !_lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__.JSONExt.deepEqual(this._branches, ((_c = data.branches) !== null && _c !== void 0 ? _c : []));
            this._branches = (_d = data.branches) !== null && _d !== void 0 ? _d : [];
            this._currentBranch = (_e = data.current_branch) !== null && _e !== void 0 ? _e : null;
            if (this._currentBranch && this._pathRepository) {
                // Set up the marker obj for the current (valid) repo/branch combination
                this._setMarker(this.pathRepository, this._currentBranch.name);
            }
            if (headChanged) {
                this._headChanged.emit();
            }
            if (branchesChanged) {
                this._branchesChanged.emit();
            }
            // Start fetch remotes if the repository has remote branches
            const hasRemote = this._branches.some(branch => branch.is_remote_branch);
            if (hasRemote) {
                this._fetchPoll.start();
            }
            else {
                this._fetchPoll.stop();
            }
        }
        catch (error) {
            const branchesChanged = this._branches.length > 0;
            const headChanged = this._currentBranch !== null;
            this._branches = [];
            this._currentBranch = null;
            this._fetchPoll.stop();
            if (headChanged) {
                this._headChanged.emit();
            }
            if (branchesChanged) {
                this._branchesChanged.emit();
            }
            if (!(error instanceof _tokens__WEBPACK_IMPORTED_MODULE_6__.Git.NotInRepository)) {
                throw error;
            }
        }
    }
    /**
     * Refresh the list of repository tags.
     *
     * @returns promise which resolves upon refreshing repository tags
     */
    async refreshTag() {
        var _a;
        try {
            const data = await this._taskHandler.execute('git:refresh:tags', async () => {
                return await this.tags();
            });
            const newTags = (_a = data.tags) !== null && _a !== void 0 ? _a : [];
            const tagsChanged = !_lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__.JSONExt.deepEqual(this._tagsList, newTags);
            this._tagsList = newTags;
            if (tagsChanged) {
                this._tagsChanged.emit();
            }
            this._fetchPoll.stop();
        }
        catch (error) {
            const tagsChanged = this._tagsList.length > 0;
            this._tagsList = [];
            this._fetchPoll.stop();
            if (tagsChanged) {
                this._tagsChanged.emit();
            }
            if (!(error instanceof _tokens__WEBPACK_IMPORTED_MODULE_6__.Git.NotInRepository)) {
                throw error;
            }
        }
    }
    /**
     * Refresh the repository status.
     *
     * Emit statusChanged if required.
     *
     * @returns promise which resolves upon refreshing the repository status
     */
    async refreshStatus() {
        var _a, _b, _c, _d, _e, _f;
        let path;
        try {
            path = await this._getPathRepository();
        }
        catch (error) {
            this._clearStatus();
            if (!(error instanceof _tokens__WEBPACK_IMPORTED_MODULE_6__.Git.NotInRepository)) {
                throw error;
            }
            return;
        }
        try {
            const data = await this._taskHandler.execute('git:refresh:status', async () => {
                return await (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'status'), 'POST');
            });
            const files = (_a = data.files) === null || _a === void 0 ? void 0 : _a.map(file => {
                return {
                    ...file,
                    status: (0,_utils__WEBPACK_IMPORTED_MODULE_8__.decodeStage)(file.x, file.y),
                    type: this._resolveFileType(file.to)
                };
            });
            this._setStatus({
                branch: (_b = data.branch) !== null && _b !== void 0 ? _b : null,
                remote: (_c = data.remote) !== null && _c !== void 0 ? _c : null,
                ahead: (_d = data.ahead) !== null && _d !== void 0 ? _d : 0,
                behind: (_e = data.behind) !== null && _e !== void 0 ? _e : 0,
                state: (_f = data.state) !== null && _f !== void 0 ? _f : 0,
                files: files !== null && files !== void 0 ? files : []
            });
            await this.refreshDirtyStatus();
        }
        catch (err) {
            // TODO we should notify the user
            this._clearStatus();
            console.error(err);
            return;
        }
    }
    /**
     * Collects files that have changed on the remote branch.
     *
     */
    async remoteChangedFiles() {
        var _a;
        // if a file is changed on remote add it to list of files with appropriate status.
        this._remoteChangedFiles.length = 0;
        try {
            if (this.status.remote && this.status.behind > 0) {
                this._remoteChangedFiles.concat(((_a = (await this._changedFiles('WORKING', this.status.remote)).files) !== null && _a !== void 0 ? _a : []).map(element => ({
                    status: 'remote-changed',
                    type: this._resolveFileType(element),
                    x: '?',
                    y: 'B',
                    to: element,
                    from: '?',
                    is_binary: false
                })));
            }
        }
        catch (err) {
            console.error(err);
        }
        return this._remoteChangedFiles;
    }
    /**
     * Determines if opened files are behind the remote and emits a signal if one
     * or more are behind and the user hasn't been notified of them yet.
     *
     */
    async checkRemoteChangeNotified() {
        var _a, _b;
        if (this.status.remote && this.status.behind > 0) {
            const notNotified = [];
            const notified = [];
            for (const val of this._remoteChangedFiles) {
                const filePath = this.getRelativeFilePath(val.to);
                if (!filePath) {
                    continue;
                }
                const docWidget = (_a = this._docmanager) === null || _a === void 0 ? void 0 : _a.findWidget(filePath);
                const notifiedIndex = this._changeUpstreamNotified.findIndex(notified => notified.from === val.from &&
                    notified.to === val.to &&
                    notified.x === val.x &&
                    notified.y === val.y);
                if (docWidget !== undefined) {
                    if (docWidget.isAttached) {
                        // notify if the user hasn't been notified yet
                        if (notifiedIndex === -1) {
                            this._changeUpstreamNotified.push(val);
                            notNotified.push(val);
                        }
                        else {
                            notified.push(val);
                        }
                    }
                }
                else {
                    // remove from notified array if document is closed
                    if (notifiedIndex > -1) {
                        this._changeUpstreamNotified.splice(notifiedIndex, 1);
                    }
                }
            }
            if ((_b = this._settings) === null || _b === void 0 ? void 0 : _b.composite['openFilesBehindWarning']) {
                if (notNotified.length > 0) {
                    this._remoteChanged.emit({ notNotified, notified });
                }
            }
        }
        else {
            this._changeUpstreamNotified = [];
        }
    }
    /**
     * Determines whether there are unsaved changes on files,
     *
     * @returns promise that resolves upon refreshing the dirty status of files
     */
    async refreshDirtyStatus() {
        // we assume the repository status has been refreshed prior to this
        var _a, _b;
        // get files
        const files = this.status.files.filter(file => this._statusForDirtyState.includes(file.status));
        const fileNames = files.map(file => file.to);
        let result = false;
        for (const fileName of fileNames) {
            const filePath = this.getRelativeFilePath(fileName);
            if (!filePath) {
                continue;
            }
            const docWidget = (_a = this._docmanager) === null || _a === void 0 ? void 0 : _a.findWidget(filePath);
            if (docWidget !== undefined) {
                const context = (_b = this._docmanager) === null || _b === void 0 ? void 0 : _b.contextForWidget(docWidget);
                if (context === null || context === void 0 ? void 0 : context.model.dirty) {
                    result = true;
                    break;
                }
            }
        }
        this.hasDirtyFiles = result;
    }
    /**
     * Move files from the "staged" to the "unstaged" area.
     *
     * ## Notes
     *
     * -  If no filename is provided, moves all files from the "staged" to the "unstaged" area.
     *
     * @param filename - file path to be reset
     * @returns promise which resolves upon moving files
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async reset(filename) {
        const path = await this._getPathRepository();
        await this._taskHandler.execute('git:reset:changes', async () => {
            var _a;
            const reset_all = filename === undefined;
            let files;
            if (reset_all) {
                files = (_a = (await this._changedFiles('INDEX', 'HEAD')).files) !== null && _a !== void 0 ? _a : [];
            }
            else {
                files = [filename];
            }
            await (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'reset'), 'POST', {
                reset_all,
                filename: filename !== null && filename !== void 0 ? filename : null
            });
            files.forEach(file => {
                this._revertFile(file);
            });
        });
        await this.refreshStatus();
    }
    /**
     * Reset the repository to a specified commit.
     *
     * ## Notes
     *
     * -   If a commit hash is not provided, resets the repository to `HEAD`.
     *
     * @param hash - commit identifier (hash)
     * @returns promises which resolves upon resetting the repository
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async resetToCommit(hash = '') {
        const path = await this._getPathRepository();
        await this._taskHandler.execute('git:reset:hard', async () => {
            const files = (await this._changedFiles(undefined, undefined, hash))
                .files;
            await (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'reset_to_commit'), 'POST', {
                commit_id: hash
            });
            files === null || files === void 0 ? void 0 : files.forEach(file => {
                this._revertFile(file);
            });
        });
        await this.refreshBranch();
    }
    /**
     * Retrieve the prefix path of a directory `path` with respect to the root repository directory.
     *
     * @param path - directory path
     * @returns promise which resolves upon retrieving the prefix path
     *
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async showPrefix(path) {
        var _a;
        try {
            const data = await this._taskHandler.execute('git:fetch:prefix_path', async () => {
                return await (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'show_prefix'), 'POST');
            });
            return (_a = data.path) !== null && _a !== void 0 ? _a : null;
        }
        catch (error) {
            if (error instanceof _tokens__WEBPACK_IMPORTED_MODULE_6__.Git.GitResponseError &&
                error.response.status === 500 &&
                error.json.code === 128) {
                return null;
            }
            throw error;
        }
    }
    /**
     * Retrieve the top level repository path.
     *
     * @param path - current path
     * @returns promise which resolves upon retrieving the top level repository path
     *
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async showTopLevel(path) {
        var _a;
        try {
            const data = await this._taskHandler.execute('git:fetch:top_level_path', async () => {
                return await (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'show_top_level'), 'POST');
            });
            return (_a = data.path) !== null && _a !== void 0 ? _a : null;
        }
        catch (error) {
            if (error instanceof _tokens__WEBPACK_IMPORTED_MODULE_6__.Git.GitResponseError &&
                error.response.status === 500 &&
                error.json.code === 128) {
                return null;
            }
            throw error;
        }
    }
    /**
     * Apply a given stash
     *
     * @param index - Index of the stash to apply.
     * @returns promise which resolves upon task completion
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async applyStash(index) {
        const path = await this._getPathRepository();
        try {
            const stashFiles = index
                ? this._stash[index].files
                : this._stash[0].files;
            await this._taskHandler.execute('git:stash:apply', async () => {
                await (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'stash_apply'), 'POST', index !== undefined ? { index } : { index: 0 });
            });
            await this.refresh();
            stashFiles.forEach(file => {
                this._revertFile(file);
            });
        }
        catch (error) {
            console.error('Failed to apply stash', error);
        }
        await this.refreshStash();
    }
    /**
     * Drop a stash entry, or clear the entire stash.
     *
     * @param index The index of the stash to be deleted. If no index is provided, the entire stash will be cleared.
     *
     * @returns promise which resolves when the task is done
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async dropStash(index) {
        let path;
        try {
            path = await this._getPathRepository();
            await this._taskHandler.execute('git:stash:drop', async () => {
                const url = (index !== null && index !== void 0 ? index : -1) >= 0
                    ? _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, `stash?stash_index=${index}`)
                    : _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'stash');
                await (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(url, 'DELETE');
            });
            await this.refreshStash();
            await this._refreshModel();
        }
        catch (error) {
            this._clearStatus();
            if (!(error instanceof _tokens__WEBPACK_IMPORTED_MODULE_6__.Git.NotInRepository)) {
                throw error;
            }
            return;
        }
    }
    /**
     * Pop a stash
     * @param index - Index of the stash to pop; pop the latest if not provided.
     * @returns promise which resolves upon task completion
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     *
     */
    async popStash(index) {
        try {
            const path = await this._getPathRepository();
            const stashFiles = (index !== null && index !== void 0 ? index : -1) >= 0 ? this._stash[index].files : [];
            await this._taskHandler.execute('git:stash:pop', async () => {
                await (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'stash_pop'), 'POST', index !== undefined ? { index } : undefined);
            });
            await this.refresh();
            stashFiles.forEach(file => {
                this._revertFile(file);
            });
        }
        catch (error) {
            console.error('Failed to pop stash', error);
        }
        await this.refreshStash();
    }
    /**
     * Checks the stash list, and sets the stash property.
     *
     * @returns promise which resolves when the task is done.
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async refreshStash() {
        let path;
        try {
            path = await this._getPathRepository();
        }
        catch (error) {
            this._clearStatus();
            if (!(error instanceof _tokens__WEBPACK_IMPORTED_MODULE_6__.Git.NotInRepository)) {
                throw error;
            }
            return;
        }
        // Get the entire stash list
        try {
            const response = await this._taskHandler.execute('git:refresh:stash', async () => {
                return await (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'stash'), 'GET');
            });
            const allStashFiles = await this._taskHandler.execute('git:refresh:stash', () => Promise.all(response.stashes.map(({ index }) => (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'stash') + `?index=${index}`, 'GET'))));
            const stashList = response.stashes.map((s, index) => Object.assign(s, {
                files: allStashFiles[index].files
            }));
            if (!this.isStashDeepEqual(stashList, this._stash)) {
                const change = {
                    name: 'stash',
                    newValue: stashList,
                    oldValue: this._stash
                };
                this._stash = stashList;
                this._stashChanged.emit(change);
            }
        }
        catch (err) {
            console.error(err);
            return;
        }
    }
    /**
     * Stash the current changes in a dirty repository.
     * @param stashMsg - Stash message
     * @returns promise which resolves upon stashing changes
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async stashChanges(stashMsg) {
        var _a;
        try {
            const path = await this._getPathRepository();
            await this._taskHandler.execute('git:stash', async () => {
                await (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'stash'), 'POST', stashMsg !== undefined ? { stashMsg } : undefined);
            });
            await this.refreshStash();
            // Assume the latest stash is accurate
            if (((_a = this._stash) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                this._stash[0].files.forEach(file => {
                    this._revertFile(file);
                });
            }
            else {
                console.error('Failed to retrieve stashed files');
            }
        }
        catch (error) {
            console.error('Error stashing changes:', error);
        }
    }
    /**
     * Compares two arrays of stash entries for deep equality.
     *
     * @param a The first array of stash entries to be compared.
     * @param b The second array of stash entries to be compared.
     * @returns boolean value indicating if both arrays of stash entries are deeply equal.
     *
     * @returns promise which resolves to an array of stashes
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    isStashDeepEqual(a, b) {
        if ((a === null || a === void 0 ? void 0 : a.length) !== (b === null || b === void 0 ? void 0 : b.length)) {
            return false;
        }
        return a.every((stashA, i) => {
            const stashB = b[i];
            return (stashA.index === stashB.index &&
                stashA.branch === stashB.branch &&
                stashA.message === stashB.message &&
                JSON.stringify(stashA.files) === JSON.stringify(stashB.files));
        });
    }
    /**
     * Retrieve the list of tags in the repository, with the respective commits they point to.
     *
     * @returns promise which resolves upon retrieving the tag list
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async tags() {
        const path = await this._getPathRepository();
        return await this._taskHandler.execute('git:tag:list', async () => {
            return await (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'tags'), 'POST');
        });
    }
    /**
     * Checkout the specified tag version
     *
     * @param tag - selected tag version
     * @returns promise which resolves upon checking out the tag version of the repository
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async checkoutTag(tag) {
        const path = await this._getPathRepository();
        return await this._taskHandler.execute('git:tag:checkout', async () => {
            return await (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'tag_checkout'), 'POST', {
                tag_id: tag
            });
        });
    }
    /**
     * Set a tag pointing to a specific commit.
     *
     * @param tagName - name of new tag
     * @param commitId - identifier of commit tag is pointing to
     * @returns promise which resolves upon succesfully creating the new tag
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async setTag(tag, commitId) {
        const path = await this._getPathRepository();
        await this._taskHandler.execute('git:tag:create', async () => {
            return await (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'tag'), 'POST', {
                tag_id: tag,
                commit_id: commitId
            });
        });
        await this.refreshTag();
    }
    /**
     * Add a file to the current marker object.
     *
     * @param fname - filename
     * @param mark - mark to set
     */
    addMark(fname, mark) {
        var _a;
        (_a = this._currentMarker) === null || _a === void 0 ? void 0 : _a.add(fname, mark);
    }
    /**
     * Set a file in the current marker object.
     *
     * @param fname - filename
     * @param mark - mark to set
     */
    setMark(fname, mark) {
        var _a;
        (_a = this._currentMarker) === null || _a === void 0 ? void 0 : _a.set(fname, mark);
    }
    /**
     * Return the current mark associated with a specified filename.
     *
     * @param fname - filename
     * @returns mark
     */
    getMark(fname) {
        var _a, _b;
        return (_b = (_a = this._currentMarker) === null || _a === void 0 ? void 0 : _a.get(fname)) !== null && _b !== void 0 ? _b : false;
    }
    /**
     * Toggle the mark for a file in the current marker object
     *
     * @param fname - filename
     */
    toggleMark(fname) {
        var _a;
        (_a = this._currentMarker) === null || _a === void 0 ? void 0 : _a.toggle(fname);
    }
    get markedFiles() {
        return this._currentMarker.markedFilePaths.filter(path => this.status.files.some(file => file.to === path)).map(path => this.status.files.find(fileStatus => fileStatus.to === path));
    }
    /**
     * Register a new diff provider for specified file extensions
     *
     * @param fileExtensions File extension list
     * @param factory Callback to use for the provided file extensions
     */
    registerDiffProvider(name, fileExtensions, factory) {
        fileExtensions.forEach(extension => {
            DIFF_PROVIDERS[extension] = { name, factory };
        });
    }
    /**
     * Revert changes made after a specified commit.
     *
     * @param message - commit message
     * @param hash - commit identifier (hash)
     * @returns promise which resolves upon reverting changes
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async revertCommit(message, hash) {
        const path = await this._getPathRepository();
        await this._taskHandler.execute('git:commit:revert', async () => {
            const files = (await this._changedFiles(undefined, undefined, hash + '^!')).files;
            await (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'delete_commit'), 'POST', {
                commit_id: hash
            });
            files === null || files === void 0 ? void 0 : files.forEach(file => {
                this._revertFile(file);
            });
        });
        await this.commit(message);
    }
    /**
     * Make request for a list of all git branches in the repository
     * Retrieve a list of repository branches.
     *
     * @returns promise which resolves upon fetching repository branches
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async _branch() {
        const path = await this._getPathRepository();
        return await this._taskHandler.execute('git:fetch:branches', async () => {
            return await (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(path, 'branch'), 'POST');
        });
    }
    /**
     * Get list of files changed between two commits or two branches.
     *
     * Notes:
     *   It assumes the Git path repository as already been checked.
     *
     * @param base id of base commit or base branch for comparison
     * @param remote id of remote commit or remote branch for comparison
     * @param singleCommit id of a single commit
     *
     * @returns the names of the changed files
     *
     * @throws {Git.GitResponseError} If the server response is not ok
     * @throws {ServerConnection.NetworkError} If the request cannot be made
     */
    async _changedFiles(base, remote, singleCommit) {
        return await (0,_git__WEBPACK_IMPORTED_MODULE_5__.requestAPI)(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(this.pathRepository, 'changed_files'), 'POST', {
            base: base,
            remote: remote,
            single_commit: singleCommit
        });
    }
    /**
     * Clear repository status
     */
    _clearStatus() {
        this._status = {
            branch: null,
            remote: null,
            ahead: 0,
            behind: 0,
            state: _tokens__WEBPACK_IMPORTED_MODULE_6__.Git.State.DEFAULT,
            files: []
        };
    }
    /**
     * Get the current Git repository path
     *
     * @throws {Git.NotInRepository} If the current path is not a Git repository
     */
    async _getPathRepository() {
        await this.ready;
        const path = this.pathRepository;
        if (path === null) {
            throw new _tokens__WEBPACK_IMPORTED_MODULE_6__.Git.NotInRepository();
        }
        return path;
    }
    /**
     * Resolve path to filetype
     */
    _resolveFileType(path) {
        var _a, _b;
        // test if directory
        if (path.endsWith('/')) {
            return _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1__.DocumentRegistry.getDefaultDirectoryFileType();
        }
        return ((_b = (_a = this._docRegistry) === null || _a === void 0 ? void 0 : _a.getFileTypesForPath(path)[0]) !== null && _b !== void 0 ? _b : _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1__.DocumentRegistry.getDefaultTextFileType());
    }
    /**
     * Set the repository status.
     *
     * @param v - repository status
     */
    _setStatus(v) {
        let areEqual = this._status.ahead === v.ahead &&
            this._status.behind === v.behind &&
            this._status.branch === v.branch &&
            this._status.state === v.state &&
            this._status.files.length === v.files.length;
        if (areEqual) {
            for (const file of v.files) {
                if (this._status.files.findIndex(oldFile => oldFile.from === file.from &&
                    oldFile.to === file.to &&
                    oldFile.x === file.x &&
                    oldFile.y === file.y)) {
                    areEqual = false;
                    break;
                }
            }
        }
        if (!areEqual) {
            this._status = v;
            this._statusChanged.emit(this._status);
        }
    }
    /**
     * Callback invoked upon a change to plugin settings.
     *
     * @private
     * @param settings - plugin settings
     */
    _onSettingsChange(settings) {
        this._fetchPoll.frequency = {
            ...this._fetchPoll.frequency,
            interval: settings.composite.refreshInterval
        };
        this._statusPoll.frequency = {
            ...this._statusPoll.frequency,
            interval: settings.composite.refreshInterval
        };
        this._statusForDirtyState = settings.composite.simpleStaging
            ? ['staged', 'partially-staged', 'unstaged']
            : ['staged', 'partially-staged'];
        this.refreshDirtyStatus();
    }
    /**
     * open new editor or show an existing editor of the
     * .gitignore file. If the editor does not have unsaved changes
     * then ensure the editor's content matches the file on disk
     */
    _openGitignore() {
        const filePath = this.getRelativeFilePath('.gitignore');
        if (this._docmanager && filePath) {
            const widget = this._docmanager.openOrReveal(filePath);
            if (widget && !widget.context.model.dirty) {
                widget.context.revert();
            }
        }
    }
    /**
     * if file is open in JupyterLab find the widget and ensure the JupyterLab
     * version matches the version on disk. Do nothing if the file has unsaved changes
     *
     * @param path path to the file to be reverted
     */
    _revertFile(path) {
        var _a;
        const filePath = this.getRelativeFilePath(path);
        if (!filePath) {
            return;
        }
        const widget = (_a = this._docmanager) === null || _a === void 0 ? void 0 : _a.findWidget(filePath);
        if (widget && !widget.context.model.dirty) {
            widget.context.revert();
        }
    }
    /**
     * Set the marker object for a repository path and branch.
     */
    _setMarker(path, branch) {
        this.__currentMarker = this._markerCache.get(path, branch);
    }
}
class BranchMarker {
    constructor(_refresh) {
        this._refresh = _refresh;
        this._marks = {};
    }
    add(fname, mark = true) {
        if (!(fname in this._marks)) {
            this.set(fname, mark);
        }
    }
    get(fname) {
        return this._marks[fname];
    }
    set(fname, mark) {
        this._marks[fname] = mark;
        this._refresh();
    }
    toggle(fname) {
        this.set(fname, !this._marks[fname]);
    }
    get markedFilePaths() {
        const markedFiles = [];
        for (const key in this._marks) {
            if (this._marks[key]) {
                markedFiles.push(key);
            }
        }
        return markedFiles;
    }
}
class Markers {
    constructor(_refresh) {
        this._refresh = _refresh;
        this._branchMarkers = {};
    }
    get(path, branch) {
        const key = Markers.markerKey(path, branch);
        if (key in this._branchMarkers) {
            return this._branchMarkers[key];
        }
        const marker = new BranchMarker(this._refresh);
        this._branchMarkers[key] = marker;
        return marker;
    }
    static markerKey(path, branch) {
        return [path, branch].join(':');
    }
}


/***/ }),

/***/ "./lib/notifications.js":
/*!******************************!*\
  !*** ./lib/notifications.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   showDetails: () => (/* binding */ showDetails),
/* harmony export */   showError: () => (/* binding */ showError)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Build notification options to display in a dialog the detailed error.
 *
 * @param error Error object to display
 * @param trans Extension translation object
 * @returns Notification option to display the full error
 */
function showError(error, trans) {
    return {
        autoClose: false,
        actions: [
            {
                label: trans.__('Show'),
                callback: () => {
                    (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)(trans.__('Error'), error, [
                        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.warnButton({ label: trans.__('Dismiss') })
                    ]);
                },
                displayType: 'warn'
            }
        ]
    };
}
/**
 * Display additional information in a dialog from a notification
 * button.
 *
 * Note: it will not add a button if the message is empty.
 *
 * @param message Details to display
 * @param trans Translation object
 * @returns Notification option to display the message
 */
function showDetails(message, trans) {
    return message
        ? {
            autoClose: 5000,
            actions: [
                {
                    label: trans.__('Details'),
                    callback: () => {
                        (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)(trans.__('Detailed message'), message, [
                            _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({ label: trans.__('Dismiss') })
                        ]);
                    },
                    displayType: 'warn'
                }
            ]
        }
        : {};
}


/***/ }),

/***/ "./lib/server.js":
/*!***********************!*\
  !*** ./lib/server.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getServerSettings: () => (/* binding */ getServerSettings)
/* harmony export */ });
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/services */ "webpack/sharing/consume/default/@jupyterlab/services");
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tokens */ "./lib/tokens.js");
/* harmony import */ var _git__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./git */ "./lib/git.js");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./version */ "./lib/version.js");





/**
 * Obtain the server settings or provide meaningful error message for the end user
 *
 * @returns The server settings
 *
 * @throws {ServerConnection.ResponseError} If the response was not ok
 * @throws {ServerConnection.NetworkError} If the request failed to reach the server
 */
async function getServerSettings(trans) {
    try {
        const endpoint = 'settings' + _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.objectToQueryString({ version: _version__WEBPACK_IMPORTED_MODULE_2__.version });
        const settings = await (0,_git__WEBPACK_IMPORTED_MODULE_3__.requestAPI)(endpoint, 'GET');
        return settings;
    }
    catch (error) {
        if (error instanceof _tokens__WEBPACK_IMPORTED_MODULE_4__.Git.GitResponseError) {
            const response = error.response;
            if (response.status === 404) {
                const message = trans.__('Git server extension is unavailable. Please ensure you have installed the ' +
                    'JupyterLab Git server extension by running: pip install --upgrade jupyterlab-git. ' +
                    'To confirm that the server extension is installed, run: jupyter server extension list.');
                throw new _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.ResponseError(response, message);
            }
            else {
                const message = error.message;
                console.error('Failed to get the server extension settings', message);
                throw new _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.ResponseError(response, message);
            }
        }
        else {
            throw error;
        }
    }
}


/***/ }),

/***/ "./lib/style/ActionButtonStyle.js":
/*!****************************************!*\
  !*** ./lib/style/ActionButtonStyle.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   actionButtonStyle: () => (/* binding */ actionButtonStyle),
/* harmony export */   hiddenButtonStyle: () => (/* binding */ hiddenButtonStyle),
/* harmony export */   showButtonOnHover: () => (/* binding */ showButtonOnHover)
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);

const actionButtonStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    flex: '0 0 auto',
    background: 'none',
    lineHeight: '0px',
    padding: '0px 0px',
    width: '16px',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    margin: '0 4px',
    $nest: {
        '&:active': {
            transform: 'scale(1.272019649)',
            overflow: 'hidden',
            backgroundColor: 'var(--jp-layout-color3)'
        },
        '&:disabled': {
            opacity: 0.4,
            background: 'none',
            cursor: 'not-allowed'
        },
        '&:hover': {
            backgroundColor: 'var(--jp-layout-color2)'
        }
    }
});
const hiddenButtonStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'none'
});
const showButtonOnHover = (() => {
    const styled = {
        $nest: {}
    };
    const selector = `&:hover .${hiddenButtonStyle}`;
    styled.$nest[selector] = {
        display: 'block'
    };
    return styled;
})();


/***/ }),

/***/ "./lib/style/BranchMenu.js":
/*!*********************************!*\
  !*** ./lib/style/BranchMenu.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   activeListItemClass: () => (/* binding */ activeListItemClass),
/* harmony export */   filterClass: () => (/* binding */ filterClass),
/* harmony export */   filterClearClass: () => (/* binding */ filterClearClass),
/* harmony export */   filterInputClass: () => (/* binding */ filterInputClass),
/* harmony export */   filterWrapperClass: () => (/* binding */ filterWrapperClass),
/* harmony export */   listItemClass: () => (/* binding */ listItemClass),
/* harmony export */   listItemIconClass: () => (/* binding */ listItemIconClass),
/* harmony export */   nameClass: () => (/* binding */ nameClass),
/* harmony export */   newBranchButtonClass: () => (/* binding */ newBranchButtonClass),
/* harmony export */   wrapperClass: () => (/* binding */ wrapperClass)
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ActionButtonStyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ActionButtonStyle */ "./lib/style/ActionButtonStyle.js");


const nameClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    flex: '1 1 auto',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
});
const wrapperClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    marginTop: '6px',
    marginBottom: '0',
    borderBottom: 'var(--jp-border-width) solid var(--jp-border-color2)'
});
const filterWrapperClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    padding: '4px 11px 4px',
    display: 'flex'
});
const filterClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    flex: '1 1 auto',
    boxSizing: 'border-box',
    display: 'inline-block',
    position: 'relative',
    fontSize: 'var(--jp-ui-font-size1)'
});
const filterInputClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    boxSizing: 'border-box',
    width: '100%',
    height: '2em',
    /* top | right | bottom | left */
    padding: '1px 18px 2px 7px',
    color: 'var(--jp-ui-font-color1)',
    fontSize: 'var(--jp-ui-font-size1)',
    fontWeight: 300,
    backgroundColor: 'var(--jp-layout-color1)',
    border: 'var(--jp-border-width) solid var(--jp-border-color2)',
    borderRadius: '3px',
    $nest: {
        '&:active': {
            border: 'var(--jp-border-width) solid var(--jp-brand-color1)'
        },
        '&:focus': {
            border: 'var(--jp-border-width) solid var(--jp-brand-color1)'
        }
    }
});
const filterClearClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    position: 'absolute',
    right: '5px',
    top: '0.6em',
    height: '1.1em',
    width: '1.1em',
    padding: 0,
    backgroundColor: 'var(--jp-inverse-layout-color4)',
    border: 'none',
    borderRadius: '50%',
    $nest: {
        svg: {
            width: '0.5em!important',
            height: '0.5em!important',
            fill: 'var(--jp-ui-inverse-font-color0)'
        },
        '&:hover': {
            backgroundColor: 'var(--jp-inverse-layout-color3)'
        },
        '&:active': {
            backgroundColor: 'var(--jp-inverse-layout-color2)'
        }
    }
});
const newBranchButtonClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    boxSizing: 'border-box',
    width: '7.7em',
    height: '2em',
    flex: '0 0 auto',
    marginLeft: '5px',
    color: 'white',
    fontSize: 'var(--jp-ui-font-size1)',
    backgroundColor: 'var(--md-blue-500)',
    border: '0',
    borderRadius: '3px',
    $nest: {
        '&:hover': {
            backgroundColor: 'var(--md-blue-600)'
        },
        '&:active': {
            backgroundColor: 'var(--md-blue-700)'
        }
    }
});
const listItemClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    padding: '4px 11px!important',
    userSelect: 'none'
}, _ActionButtonStyle__WEBPACK_IMPORTED_MODULE_1__.showButtonOnHover);
const activeListItemClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    color: 'white!important',
    backgroundColor: 'var(--jp-brand-color1)!important',
    $nest: {
        '& .jp-icon-selectable[fill]': {
            fill: 'white'
        }
    }
});
const listItemIconClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    width: '16px',
    height: '16px',
    marginRight: '4px'
});


/***/ }),

/***/ "./lib/style/CommitBox.js":
/*!********************************!*\
  !*** ./lib/style/CommitBox.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   activeStyle: () => (/* binding */ activeStyle),
/* harmony export */   commitButtonClass: () => (/* binding */ commitButtonClass),
/* harmony export */   commitDescriptionClass: () => (/* binding */ commitDescriptionClass),
/* harmony export */   commitFormClass: () => (/* binding */ commitFormClass),
/* harmony export */   commitInputWrapperClass: () => (/* binding */ commitInputWrapperClass),
/* harmony export */   commitPaperClass: () => (/* binding */ commitPaperClass),
/* harmony export */   commitRoot: () => (/* binding */ commitRoot),
/* harmony export */   commitSummaryClass: () => (/* binding */ commitSummaryClass),
/* harmony export */   commitVariantSelector: () => (/* binding */ commitVariantSelector),
/* harmony export */   commitVariantText: () => (/* binding */ commitVariantText),
/* harmony export */   dirtyStagedFilesWarningBoxClass: () => (/* binding */ dirtyStagedFilesWarningBoxClass),
/* harmony export */   dirtyStagedFilesWarningBoxContentClass: () => (/* binding */ dirtyStagedFilesWarningBoxContentClass),
/* harmony export */   dirtyStagedFilesWarningBoxHeaderClass: () => (/* binding */ dirtyStagedFilesWarningBoxHeaderClass),
/* harmony export */   disabledStyle: () => (/* binding */ disabledStyle)
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);

const commitFormClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 'auto',
    padding: '8px',
    paddingTop: '1em',
    alignItems: 'flex-start',
    backgroundColor: 'var(--jp-layout-color1)',
    borderTop: 'var(--jp-border-width) solid var(--jp-border-color2)'
});
const dirtyStagedFilesWarningBoxClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    marginBottom: '1em',
    padding: 'var(--jp-code-padding)',
    outline: 'none',
    overflowX: 'auto',
    border: 'var(--jp-border-width) solid var(--jp-border-color2)',
    borderRadius: '3px'
});
const dirtyStagedFilesWarningBoxHeaderClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    fontWeight: 'bold',
    marginBottom: '0.5em',
    color: 'var(--jp-warn-color1)',
    padding: 0
});
const dirtyStagedFilesWarningBoxContentClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    color: 'var(--jp-warn-color1)',
    padding: 0,
    $nest: {
        '&:last-child': {
            paddingBottom: 0
        }
    }
});
const commitSummaryClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    height: '2em',
    marginBottom: '1em',
    padding: 'var(--jp-code-padding)',
    outline: 'none',
    overflowX: 'auto',
    border: 'var(--jp-border-width) solid var(--jp-border-color2)',
    borderRadius: '3px',
    $nest: {
        '&.Mui-error': {
            border: 'calc(2 * var(--jp-border-width)) solid var(--jp-error-color1)'
        }
    }
});
const commitDescriptionClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    marginBottom: '1em',
    padding: 'var(--jp-code-padding) !important',
    outline: 'none',
    overflowX: 'auto',
    resize: 'none',
    border: 'var(--jp-border-width) solid var(--jp-border-color2)',
    borderRadius: '3px',
    $nest: {
        '&>*::placeholder': {
            color: 'var(--jp-ui-font-color3)'
        },
        '&>*::-webkit-input-placeholder': {
            color: 'var(--jp-ui-font-color3)'
        },
        '&>*::-moz-placeholder': {
            color: 'var(--jp-ui-font-color3)'
        },
        '&>*::-ms-input-placeholder': {
            color: 'var(--jp-ui-font-color3)'
        }
    }
});
const commitButtonClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    color: 'var(--jp-ui-inverse-font-color1) !important',
    backgroundColor: 'var(--jp-brand-color1) !important',
    $nest: {
        '&:hover': {
            backgroundColor: 'var(--jp-brand-color2) !important'
        }
    }
});
const commitVariantSelector = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    flex: '0 0 20px',
    lineHeight: 'initial !important',
    $nest: {
        '& span': {
            lineHeight: '0'
        },
        '& .jp-icon3[fill]': {
            fill: 'var(--jp-ui-inverse-font-color1)'
        }
    }
});
const commitInputWrapperClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
});
const commitPaperClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    maxWidth: '250px'
});
const commitVariantText = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    fontSize: 'var(--jp-ui-font-size1)',
    whiteSpace: 'break-spaces'
});
const commitRoot = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    color: 'var(--jp-ui-font-color1) !important',
    fontSize: 'var(--jp-ui-font-size1) !important',
    fontFamily: 'var(--jp-ui-font-family) !important',
    backgroundColor: 'var(--jp-layout-color1) !important'
});
const activeStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    outline: 'none',
    border: 'var(--jp-border-width) solid var(--jp-brand-color1)'
});
const disabledStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    cursor: 'not-allowed !important',
    color: 'var(--jp-ui-font-color2) !important',
    backgroundColor: 'var(--jp-layout-color3) !important',
    // TypeScript does not know about the value with `!important` flag
    pointerEvents: 'auto !important'
});


/***/ }),

/***/ "./lib/style/CommitComparisonBox.js":
/*!******************************************!*\
  !*** ./lib/style/CommitComparisonBox.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   commitComparisonBoxStyle: () => (/* binding */ commitComparisonBoxStyle),
/* harmony export */   commitComparisonDiffStyle: () => (/* binding */ commitComparisonDiffStyle)
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);

const commitComparisonBoxStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    flex: '0 0 auto',
    display: 'flex',
    flexDirection: 'column',
    marginBlockStart: 0,
    marginBlockEnd: 0,
    paddingLeft: 0,
    overflowY: 'auto',
    borderTop: 'var(--jp-border-width) solid var(--jp-border-color2)'
});
const commitComparisonDiffStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    paddingLeft: 10
});


/***/ }),

/***/ "./lib/style/FileItemStyle.js":
/*!************************************!*\
  !*** ./lib/style/FileItemStyle.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkboxLabelContainerStyle: () => (/* binding */ checkboxLabelContainerStyle),
/* harmony export */   checkboxLabelLastContainerStyle: () => (/* binding */ checkboxLabelLastContainerStyle),
/* harmony export */   checkboxLabelStyle: () => (/* binding */ checkboxLabelStyle),
/* harmony export */   fileButtonStyle: () => (/* binding */ fileButtonStyle),
/* harmony export */   fileChangedLabelBrandStyle: () => (/* binding */ fileChangedLabelBrandStyle),
/* harmony export */   fileChangedLabelInfoStyle: () => (/* binding */ fileChangedLabelInfoStyle),
/* harmony export */   fileChangedLabelStyle: () => (/* binding */ fileChangedLabelStyle),
/* harmony export */   fileChangedLabelWarnStyle: () => (/* binding */ fileChangedLabelWarnStyle),
/* harmony export */   fileGitButtonStyle: () => (/* binding */ fileGitButtonStyle),
/* harmony export */   fileStyle: () => (/* binding */ fileStyle),
/* harmony export */   gitMarkBoxStyle: () => (/* binding */ gitMarkBoxStyle),
/* harmony export */   selectedFileChangedLabelStyle: () => (/* binding */ selectedFileChangedLabelStyle),
/* harmony export */   selectedFileStyle: () => (/* binding */ selectedFileStyle)
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ActionButtonStyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ActionButtonStyle */ "./lib/style/ActionButtonStyle.js");


const fileStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    userSelect: 'none',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    boxSizing: 'border-box',
    color: 'var(--jp-ui-font-color1)',
    lineHeight: 'var(--jp-private-running-item-height)',
    padding: '0px 4px',
    listStyleType: 'none',
    $nest: {
        '&:hover': {
            backgroundColor: 'var(--jp-layout-color2)'
        }
    }
}, _ActionButtonStyle__WEBPACK_IMPORTED_MODULE_1__.showButtonOnHover);
const selectedFileStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)((() => {
    const styled = {
        color: 'white',
        background: 'var(--jp-brand-color1)',
        $nest: {
            '&:hover': {
                color: 'white',
                background: 'var(--jp-brand-color1) !important'
            },
            '&:hover .jp-icon-selectable[fill]': {
                fill: 'white'
            },
            '&:hover .jp-icon-selectable[stroke]': {
                stroke: 'white'
            },
            '& .jp-icon-selectable[fill]': {
                fill: 'white'
            },
            '& .jp-icon-selectable-inverse[fill]': {
                fill: 'var(--jp-brand-color1)'
            }
        }
    };
    styled.$nest[`& .${_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_1__.actionButtonStyle}:active`] = {
        backgroundColor: 'var(--jp-brand-color1)'
    };
    styled.$nest[`& .${_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_1__.actionButtonStyle}:hover`] = {
        backgroundColor: 'var(--jp-brand-color1)'
    };
    return styled;
})());
const fileChangedLabelStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    fontSize: '10px',
    marginLeft: '5px'
});
const selectedFileChangedLabelStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    color: 'white !important'
});
const fileChangedLabelBrandStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    color: 'var(--jp-brand-color0)'
});
const fileChangedLabelWarnStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    color: 'var(--jp-warn-color0)',
    fontWeight: 'bold'
});
const fileChangedLabelInfoStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    color: 'var(--jp-info-color0)'
});
const fileGitButtonStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'none'
});
const fileButtonStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    marginTop: '5px'
});
const gitMarkBoxStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    flex: '0 0 auto'
});
const checkboxLabelStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex',
    alignItems: 'center'
});
const checkboxLabelContainerStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex',
    width: '100%'
});
const checkboxLabelLastContainerStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex',
    marginLeft: 'auto',
    overflow: 'hidden'
});


/***/ }),

/***/ "./lib/style/FileListStyle.js":
/*!************************************!*\
  !*** ./lib/style/FileListStyle.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fileListWrapperClass: () => (/* binding */ fileListWrapperClass)
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);

const fileListWrapperClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    flex: '1 1 auto',
    minHeight: '150px',
    overflow: 'hidden',
    overflowY: 'auto'
});


/***/ }),

/***/ "./lib/style/FilePathStyle.js":
/*!************************************!*\
  !*** ./lib/style/FilePathStyle.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fileIconStyle: () => (/* binding */ fileIconStyle),
/* harmony export */   fileLabelStyle: () => (/* binding */ fileLabelStyle),
/* harmony export */   folderLabelStyle: () => (/* binding */ folderLabelStyle)
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);

const fileIconStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    flex: '0 0 auto',
    height: '16px',
    width: '16px',
    marginRight: '4px'
});
const fileLabelStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    flex: '1 1 auto',
    fontSize: 'var(--jp-ui-font-size1)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
});
const folderLabelStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    color: 'var(--jp-ui-font-color2)',
    fontSize: 'var(--jp-ui-font-size0)',
    margin: '0px 4px'
});


/***/ }),

/***/ "./lib/style/GitPanel.js":
/*!*******************************!*\
  !*** ./lib/style/GitPanel.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   panelWrapperClass: () => (/* binding */ panelWrapperClass),
/* harmony export */   repoButtonClass: () => (/* binding */ repoButtonClass),
/* harmony export */   selectedTabClass: () => (/* binding */ selectedTabClass),
/* harmony export */   tabClass: () => (/* binding */ tabClass),
/* harmony export */   tabIndicatorClass: () => (/* binding */ tabIndicatorClass),
/* harmony export */   tabsClass: () => (/* binding */ tabsClass),
/* harmony export */   warningTextClass: () => (/* binding */ warningTextClass)
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);

const panelWrapperClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflowY: 'auto'
});
const warningTextClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    fontSize: 'var(--jp-ui-font-size1)',
    lineHeight: 'var(--jp-content-line-height)',
    margin: '13px 11px 4px 11px',
    textAlign: 'left'
});
const repoButtonClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    alignSelf: 'center',
    boxSizing: 'border-box',
    height: '28px',
    width: '200px',
    marginTop: '5px',
    border: '0',
    borderRadius: '3px',
    color: 'white',
    fontSize: 'var(--jp-ui-font-size1)',
    backgroundColor: 'var(--md-blue-500)',
    $nest: {
        '&:hover': {
            backgroundColor: 'var(--md-blue-600)'
        },
        '&:active': {
            backgroundColor: 'var(--md-blue-700)'
        }
    }
});
const tabsClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    minHeight: '36px!important',
    $nest: {
        'button:last-of-type': {
            borderRight: 'none'
        }
    }
});
const tabClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    width: '50%',
    minWidth: '0!important',
    maxWidth: '50%!important',
    minHeight: '36px!important',
    color: 'var(--jp-ui-font-color1)!important',
    backgroundColor: 'var(--jp-layout-color2)!important',
    borderBottom: 'var(--jp-border-width) solid var(--jp-border-color2)!important',
    borderRight: 'var(--jp-border-width) solid var(--jp-border-color2)!important',
    // @ts-expect-error unknown value
    textTransform: 'none !important'
});
const selectedTabClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    backgroundColor: 'var(--jp-layout-color1)!important'
});
const tabIndicatorClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    height: '3px!important',
    backgroundColor: 'var(--jp-brand-color1)!important',
    transition: 'none!important'
});


/***/ }),

/***/ "./lib/style/GitStageStyle.js":
/*!************************************!*\
  !*** ./lib/style/GitStageStyle.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   changeStageButtonStyle: () => (/* binding */ changeStageButtonStyle),
/* harmony export */   sectionAreaStyle: () => (/* binding */ sectionAreaStyle),
/* harmony export */   sectionFileContainerStyle: () => (/* binding */ sectionFileContainerStyle),
/* harmony export */   sectionHeaderLabelStyle: () => (/* binding */ sectionHeaderLabelStyle),
/* harmony export */   sectionHeaderSizeStyle: () => (/* binding */ sectionHeaderSizeStyle)
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ActionButtonStyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ActionButtonStyle */ "./lib/style/ActionButtonStyle.js");


const sectionAreaStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '4px',
    fontWeight: 600,
    borderBottom: 'var(--jp-border-width) solid var(--jp-border-color2)',
    letterSpacing: '1px',
    fontSize: '12px',
    overflowY: 'hidden',
    height: '16px',
    $nest: {
        '&:hover': {
            backgroundColor: 'var(--jp-layout-color2)'
        }
    }
}, _ActionButtonStyle__WEBPACK_IMPORTED_MODULE_1__.showButtonOnHover);
const sectionFileContainerStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)((() => {
    const styled = {
        margin: '0',
        padding: '0',
        overflow: 'auto',
        $nest: {}
    };
    const focus = `&:focus-within .${sectionAreaStyle} .${_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_1__.hiddenButtonStyle}`;
    styled.$nest[focus] = {
        display: 'block'
    };
    const hoverSelector = `&:hover .${sectionAreaStyle} .${_ActionButtonStyle__WEBPACK_IMPORTED_MODULE_1__.hiddenButtonStyle}`;
    styled.$nest[hoverSelector] = {
        display: 'block'
    };
    return styled;
})());
const sectionHeaderLabelStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    fontSize: 'var(--jp-ui-font-size1)',
    flex: '1 1 auto',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
});
const sectionHeaderSizeStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    fontSize: 'var(--jp-ui-font-size1)',
    flex: '0 0 auto',
    whiteSpace: 'nowrap',
    borderRadius: '2px'
});
const changeStageButtonStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    flex: '0 0 auto',
    backgroundColor: 'transparent',
    height: '13px',
    border: 'none',
    outline: 'none',
    paddingLeft: '0px'
});


/***/ }),

/***/ "./lib/style/GitStashStyle.js":
/*!************************************!*\
  !*** ./lib/style/GitStashStyle.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   listStyle: () => (/* binding */ listStyle),
/* harmony export */   sectionButtonContainerStyle: () => (/* binding */ sectionButtonContainerStyle),
/* harmony export */   sectionHeaderLabelStyle: () => (/* binding */ sectionHeaderLabelStyle),
/* harmony export */   stashContainerStyle: () => (/* binding */ stashContainerStyle),
/* harmony export */   stashEntryMessageStyle: () => (/* binding */ stashEntryMessageStyle),
/* harmony export */   stashFileStyle: () => (/* binding */ stashFileStyle)
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _GitStageStyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GitStageStyle */ "./lib/style/GitStageStyle.js");


const stashContainerStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)((() => {
    const styled = { $nest: {} };
    styled.$nest[`& > .${_GitStageStyle__WEBPACK_IMPORTED_MODULE_1__.sectionAreaStyle}`] = {
        margin: 0
    };
    return styled;
})());
const sectionHeaderLabelStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    fontSize: 'var(--jp-ui-font-size1)',
    flex: '1 1 auto',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    display: 'flex',
    justifyContent: 'space-between',
    alignSelf: 'flex-start'
});
const sectionButtonContainerStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex'
});
const stashFileStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex',
    padding: '0 4px'
});
const listStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    overflowX: 'hidden',
    $nest: {
        '&>*': {
            margin: 0,
            padding: 0
        }
    }
});
const stashEntryMessageStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    display: 'inline-block'
});


/***/ }),

/***/ "./lib/style/GitWidgetStyle.js":
/*!*************************************!*\
  !*** ./lib/style/GitWidgetStyle.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   gitWidgetStyle: () => (/* binding */ gitWidgetStyle)
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);

const gitWidgetStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex',
    flexDirection: 'column',
    minWidth: '300px',
    color: 'var(--jp-ui-font-color1)',
    background: 'var(--jp-layout-color1)',
    fontSize: 'var(--jp-ui-font-size1)'
});


/***/ }),

/***/ "./lib/style/HistorySideBarStyle.js":
/*!******************************************!*\
  !*** ./lib/style/HistorySideBarStyle.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   historySideBarStyle: () => (/* binding */ historySideBarStyle),
/* harmony export */   historySideBarWrapperStyle: () => (/* binding */ historySideBarWrapperStyle),
/* harmony export */   noHistoryFoundStyle: () => (/* binding */ noHistoryFoundStyle),
/* harmony export */   selectedHistoryFileStyle: () => (/* binding */ selectedHistoryFileStyle)
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);

const selectedHistoryFileStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    minHeight: '48px',
    top: 0,
    position: 'sticky',
    flexGrow: 0,
    flexShrink: 0,
    overflowX: 'hidden',
    backgroundColor: 'var(--jp-toolbar-active-background)'
});
const noHistoryFoundStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex',
    justifyContent: 'center',
    padding: '10px 0',
    color: 'var(--jp-ui-font-color2)'
});
const historySideBarStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '200px',
    marginBlockStart: 0,
    marginBlockEnd: 0,
    paddingLeft: 0,
    paddingRight: '8px',
    overflowY: 'auto'
});
const historySideBarWrapperStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex'
});


/***/ }),

/***/ "./lib/style/ImageDiffStyle.js":
/*!*************************************!*\
  !*** ./lib/style/ImageDiffStyle.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   challengerImageClass: () => (/* binding */ challengerImageClass),
/* harmony export */   challengerLabelClass: () => (/* binding */ challengerLabelClass),
/* harmony export */   emptyChallImage: () => (/* binding */ emptyChallImage),
/* harmony export */   emptyRefImage: () => (/* binding */ emptyRefImage),
/* harmony export */   imageCol: () => (/* binding */ imageCol),
/* harmony export */   imageDiffWidgetClass: () => (/* binding */ imageDiffWidgetClass),
/* harmony export */   labelsClass: () => (/* binding */ labelsClass),
/* harmony export */   onionSkinChallengerImage: () => (/* binding */ onionSkinChallengerImage),
/* harmony export */   onionSkinContainer: () => (/* binding */ onionSkinContainer),
/* harmony export */   onionSkinImage: () => (/* binding */ onionSkinImage),
/* harmony export */   onionSkinImageContainer: () => (/* binding */ onionSkinImageContainer),
/* harmony export */   onionSkinReferenceImage: () => (/* binding */ onionSkinReferenceImage),
/* harmony export */   referenceImageClass: () => (/* binding */ referenceImageClass),
/* harmony export */   referenceLabelClass: () => (/* binding */ referenceLabelClass),
/* harmony export */   slider: () => (/* binding */ slider),
/* harmony export */   sliderChallengerCircle: () => (/* binding */ sliderChallengerCircle),
/* harmony export */   sliderReferenceCircle: () => (/* binding */ sliderReferenceCircle),
/* harmony export */   swipeBackground: () => (/* binding */ swipeBackground),
/* harmony export */   swipeChallengerImage: () => (/* binding */ swipeChallengerImage),
/* harmony export */   swipeContainer: () => (/* binding */ swipeContainer),
/* harmony export */   swipeImage: () => (/* binding */ swipeImage),
/* harmony export */   swipeReferenceImage: () => (/* binding */ swipeReferenceImage),
/* harmony export */   tabClass: () => (/* binding */ tabClass),
/* harmony export */   tabIndicatorClass: () => (/* binding */ tabIndicatorClass),
/* harmony export */   tabsClass: () => (/* binding */ tabsClass),
/* harmony export */   twoUpView: () => (/* binding */ twoUpView)
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);

const imageDiffWidgetClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    overflow: 'visible'
});
const labelsClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex',
    alignItems: 'center'
});
const referenceLabelClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    color: 'var(--jp-ui-font-color1)',
    fontWeight: 'bold',
    backgroundColor: 'var(--jp-diff-deleted-color0)',
    padding: '3px',
    paddingRight: '7px',
    flexGrow: 1,
    maxWidth: '50%',
    overflow: 'hidden'
});
const challengerLabelClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    color: 'var(--jp-ui-font-color1)',
    fontWeight: 'bold',
    backgroundColor: 'var(--jp-diff-added-color0)',
    padding: '3px',
    paddingRight: '7px',
    flexGrow: 1,
    maxWidth: '50%',
    overflow: 'hidden'
});
const tabsClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    borderTop: '1px solid var(--jp-border-color2)',
    color: 'var(--jp-ui-font-color1)'
});
const tabClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    minHeight: '15px',
    borderBottom: 'var(--jp-border-width) solid var(--jp-border-color3)!important',
    borderRight: 'var(--jp-border-width) solid var(--jp-border-color3)!important',
    $nest: {
        span: {
            textTransform: 'none'
        }
    }
});
const tabIndicatorClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    height: '2px!important',
    top: '0!important',
    bottom: 'unset!important',
    backgroundColor: 'var(--jp-brand-color1)!important',
    transition: 'none!important'
});
const twoUpView = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: '5px',
    padding: '0px 8px!important',
    overflow: 'scroll'
});
const imageCol = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    color: 'var(--jp-ui-font-color2)'
});
const emptyRefImage = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    backgroundImage: 'repeating-linear-gradient(-45deg, var(--jp-diff-deleted-color1), var(--jp-diff-deleted-color1) 3px, transparent 3px, transparent 10px)'
});
const emptyChallImage = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    backgroundImage: 'repeating-linear-gradient(-45deg, var(--jp-diff-added-color1), var(--jp-diff-added-color1) 3px, transparent 3px, transparent 10px)'
});
const referenceImageClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    width: 'auto',
    maxHeight: '500px!important',
    border: '5px solid var(--jp-diff-deleted-color0)',
    maxWidth: '400px!important'
});
const challengerImageClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    width: 'auto',
    maxHeight: '500px',
    border: '5px solid var(--jp-diff-added-color0)',
    maxWidth: '400px'
});
const slider = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    padding: '5px 0',
    margin: '0px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '8px'
});
const sliderReferenceCircle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    color: 'var(--jp-diff-deleted-color0)'
});
const sliderChallengerCircle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    color: 'var(--jp-diff-added-color0)'
});
const swipeContainer = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    overflowX: 'scroll',
    padding: '0px 40px'
});
const swipeBackground = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    position: 'relative',
    width: '100%',
    height: '510px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});
const swipeImage = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 1,
    margin: 'auto',
    height: '500px',
    width: 'auto',
    maxWidth: '800px',
    objectFit: 'scale-down'
});
const swipeReferenceImage = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    border: '5px solid var(--jp-diff-deleted-color0)'
});
const swipeChallengerImage = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    border: '5px solid var(--jp-diff-added-color0)'
});
const onionSkinContainer = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    overflow: 'scroll',
    padding: '0px 10px'
});
const onionSkinImageContainer = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    position: 'relative',
    height: '510px',
    width: '100%'
});
const onionSkinImage = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    width: 'auto',
    height: '500px',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    maxWidth: '800px',
    objectFit: 'scale-down',
    backgroundColor: 'var(--jp-layout-color0)'
});
const onionSkinReferenceImage = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    opacity: 1,
    border: '5px solid var(--jp-diff-deleted-color0)'
});
const onionSkinChallengerImage = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    opacity: 0,
    border: '5px solid var(--jp-diff-added-color0)'
});


/***/ }),

/***/ "./lib/style/ManageRemoteDialog.js":
/*!*****************************************!*\
  !*** ./lib/style/ManageRemoteDialog.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   actionsWrapperClass: () => (/* binding */ actionsWrapperClass),
/* harmony export */   existingRemoteGridClass: () => (/* binding */ existingRemoteGridClass),
/* harmony export */   existingRemoteWrapperClass: () => (/* binding */ existingRemoteWrapperClass),
/* harmony export */   remoteDialogClass: () => (/* binding */ remoteDialogClass),
/* harmony export */   remoteDialogInputClass: () => (/* binding */ remoteDialogInputClass)
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);

const remoteDialogClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    color: 'var(--jp-ui-font-color1)!important',
    borderRadius: '3px!important',
    backgroundColor: 'var(--jp-layout-color1)!important'
});
const remoteDialogInputClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex',
    flexDirection: 'column',
    $nest: {
        '& > input': {
            marginTop: '10px',
            lineHeight: '20px'
        }
    }
});
const actionsWrapperClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    padding: '15px 0px !important',
    justifyContent: 'space-around !important'
});
const existingRemoteWrapperClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    margin: '1.5rem 0rem 1rem',
    padding: '0px'
});
const existingRemoteGridClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    marginTop: '2px',
    display: 'grid',
    rowGap: '5px',
    columnGap: '10px',
    gridTemplateColumns: 'auto auto auto'
});


/***/ }),

/***/ "./lib/style/NewBranchDialog.js":
/*!**************************************!*\
  !*** ./lib/style/NewBranchDialog.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   actionsWrapperClass: () => (/* binding */ actionsWrapperClass),
/* harmony export */   activeListItemClass: () => (/* binding */ activeListItemClass),
/* harmony export */   branchDialogClass: () => (/* binding */ branchDialogClass),
/* harmony export */   buttonClass: () => (/* binding */ buttonClass),
/* harmony export */   cancelButtonClass: () => (/* binding */ cancelButtonClass),
/* harmony export */   closeButtonClass: () => (/* binding */ closeButtonClass),
/* harmony export */   contentWrapperClass: () => (/* binding */ contentWrapperClass),
/* harmony export */   createButtonClass: () => (/* binding */ createButtonClass),
/* harmony export */   errorMessageClass: () => (/* binding */ errorMessageClass),
/* harmony export */   filterClass: () => (/* binding */ filterClass),
/* harmony export */   filterClearClass: () => (/* binding */ filterClearClass),
/* harmony export */   filterInputClass: () => (/* binding */ filterInputClass),
/* harmony export */   filterWrapperClass: () => (/* binding */ filterWrapperClass),
/* harmony export */   listItemBoldTitleClass: () => (/* binding */ listItemBoldTitleClass),
/* harmony export */   listItemClass: () => (/* binding */ listItemClass),
/* harmony export */   listItemContentClass: () => (/* binding */ listItemContentClass),
/* harmony export */   listItemDescClass: () => (/* binding */ listItemDescClass),
/* harmony export */   listItemIconClass: () => (/* binding */ listItemIconClass),
/* harmony export */   listItemTitleClass: () => (/* binding */ listItemTitleClass),
/* harmony export */   listWrapperClass: () => (/* binding */ listWrapperClass),
/* harmony export */   nameInputClass: () => (/* binding */ nameInputClass),
/* harmony export */   titleClass: () => (/* binding */ titleClass),
/* harmony export */   titleWrapperClass: () => (/* binding */ titleWrapperClass)
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);

const branchDialogClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    width: '400px',
    color: 'var(--jp-ui-font-color1)!important',
    borderRadius: '3px!important',
    backgroundColor: 'var(--jp-layout-color1)!important'
});
const closeButtonClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    position: 'absolute',
    top: '10px',
    right: '12px',
    height: '30px',
    width: '30px',
    padding: 0,
    border: 'none',
    borderRadius: '50%',
    backgroundColor: 'var(--jp-layout-color1)',
    $nest: {
        svg: {
            fill: 'var(--jp-ui-font-color1)'
        },
        '&:hover': {
            backgroundColor: 'var(--jp-border-color2)'
        },
        '&:active': {
            backgroundColor: 'var(--jp-border-color2)'
        }
    }
});
const titleWrapperClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    boxSizing: 'border-box',
    position: 'relative',
    padding: '15px',
    borderBottom: 'var(--jp-border-width) solid var(--jp-border-color2)',
    $nest: {
        '& > p': {
            margin: 0
        }
    }
});
const titleClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    fontWeight: 700
});
const contentWrapperClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    padding: '15px',
    $nest: {
        '> p': {
            marginBottom: '7px'
        }
    }
});
const nameInputClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    boxSizing: 'border-box',
    width: '100%',
    height: '2em',
    marginBottom: '16px',
    /* top | right | bottom | left */
    padding: '1px 18px 2px 7px',
    color: 'var(--jp-ui-font-color1)',
    fontSize: 'var(--jp-ui-font-size1)',
    fontWeight: 300,
    backgroundColor: 'var(--jp-layout-color1)',
    border: 'var(--jp-border-width) solid var(--jp-border-color2)',
    borderRadius: '3px',
    $nest: {
        '&:active': {
            border: 'var(--jp-border-width) solid var(--jp-brand-color1)'
        },
        '&:focus': {
            border: 'var(--jp-border-width) solid var(--jp-brand-color1)'
        }
    }
});
const filterWrapperClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    padding: 0,
    paddingBottom: '4px'
});
const filterClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    boxSizing: 'border-box',
    display: 'inline-block',
    position: 'relative',
    width: '100%',
    marginRight: '11px',
    fontSize: 'var(--jp-ui-font-size1)'
});
const filterInputClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    boxSizing: 'border-box',
    width: '100%',
    height: '2em',
    /* top | right | bottom | left */
    padding: '1px 18px 2px 7px',
    color: 'var(--jp-ui-font-color1)',
    fontSize: 'var(--jp-ui-font-size1)',
    fontWeight: 300,
    backgroundColor: 'var(--jp-layout-color1)',
    border: 'var(--jp-border-width) solid var(--jp-border-color2)',
    borderRadius: '3px',
    $nest: {
        '&:active': {
            border: 'var(--jp-border-width) solid var(--jp-brand-color1)'
        },
        '&:focus': {
            border: 'var(--jp-border-width) solid var(--jp-brand-color1)'
        }
    }
});
const filterClearClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    position: 'absolute',
    right: '5px',
    top: '0.6em',
    height: '1.1em',
    width: '1.1em',
    padding: 0,
    backgroundColor: 'var(--jp-inverse-layout-color4)',
    border: 'none',
    borderRadius: '50%',
    $nest: {
        svg: {
            width: '0.5em!important',
            height: '0.5em!important',
            fill: 'var(--jp-ui-inverse-font-color0)'
        },
        '&:hover': {
            backgroundColor: 'var(--jp-inverse-layout-color3)'
        },
        '&:active': {
            backgroundColor: 'var(--jp-inverse-layout-color2)'
        }
    }
});
const listWrapperClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    boxSizing: 'border-box',
    display: 'block',
    border: 'var(--jp-border-width) solid var(--jp-border-color2)',
    borderRadius: '3px',
    paddingTop: 0,
    paddingBottom: 0
});
const listItemClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    /* top | right | bottom | left */
    padding: '4px 11px 4px 11px!important',
    fontSize: 'var(--jp-ui-font-size1)',
    lineHeight: '1.5em'
});
const activeListItemClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    color: 'white!important',
    backgroundColor: 'var(--jp-brand-color1)!important',
    $nest: {
        '& .jp-icon-selectable[fill]': {
            fill: 'white'
        }
    }
});
const listItemContentClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    flexBasis: 0,
    flexGrow: 1,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: 'auto',
    $nest: {
        '& > p': {
            margin: 0
        }
    }
});
const listItemDescClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    marginBottom: 'auto',
    whiteSpace: 'break-spaces'
});
const listItemIconClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    width: '16px',
    height: '16px',
    /* top | right | bottom | left */
    margin: 'auto 8px auto 0'
});
const listItemTitleClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({});
const listItemBoldTitleClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    fontWeight: 700
});
const errorMessageClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    color: '#ff0000'
});
const actionsWrapperClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    padding: '15px!important',
    borderTop: 'var(--jp-border-width) solid var(--jp-border-color2)'
});
const buttonClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    boxSizing: 'border-box',
    width: '9em',
    height: '2em',
    color: 'white',
    fontSize: 'var(--jp-ui-font-size1)',
    border: '0',
    borderRadius: '3px'
});
const cancelButtonClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    backgroundColor: 'var(--md-grey-500)',
    $nest: {
        '&:hover': {
            backgroundColor: 'var(--md-grey-600)'
        },
        '&:active': {
            backgroundColor: 'var(--md-grey-700)'
        }
    }
});
const createButtonClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    backgroundColor: 'var(--md-blue-500)',
    $nest: {
        '&:hover': {
            backgroundColor: 'var(--md-blue-600)'
        },
        '&:active': {
            backgroundColor: 'var(--md-blue-700)'
        },
        '&:disabled': {
            cursor: 'default',
            color: 'var(--jp-ui-inverse-font-color0)',
            backgroundColor: 'var(--jp-layout-color3)'
        },
        '&:disabled:hover': {
            backgroundColor: 'var(--jp-layout-color3)'
        },
        '&:disabled:active': {
            backgroundColor: 'var(--jp-layout-color3)'
        }
    }
});


/***/ }),

/***/ "./lib/style/NewTagDialog.js":
/*!***********************************!*\
  !*** ./lib/style/NewTagDialog.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   activeListItemClass: () => (/* binding */ activeListItemClass),
/* harmony export */   commitBodyClass: () => (/* binding */ commitBodyClass),
/* harmony export */   commitHeaderBoldClass: () => (/* binding */ commitHeaderBoldClass),
/* harmony export */   commitHeaderClass: () => (/* binding */ commitHeaderClass),
/* harmony export */   commitHeaderItemClass: () => (/* binding */ commitHeaderItemClass),
/* harmony export */   commitItemBoldClass: () => (/* binding */ commitItemBoldClass),
/* harmony export */   commitWrapperClass: () => (/* binding */ commitWrapperClass),
/* harmony export */   historyDialogBoxStyle: () => (/* binding */ historyDialogBoxStyle),
/* harmony export */   historyDialogBoxWrapperStyle: () => (/* binding */ historyDialogBoxWrapperStyle)
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);

const historyDialogBoxStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '200px',
    marginBlockStart: 0,
    marginBlockEnd: 0,
    paddingLeft: 0,
    listStyleType: 'none'
});
const historyDialogBoxWrapperStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex',
    height: '200px',
    overflowY: 'auto'
});
const activeListItemClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    backgroundColor: 'var(--jp-brand-color1)!important',
    $nest: {
        '& .jp-icon-selectable[fill]': {
            fill: 'white'
        }
    }
});
const commitHeaderBoldClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    color: 'white!important',
    fontWeight: '700'
});
const commitItemBoldClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    color: 'white!important'
});
const commitWrapperClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    flexGrow: 0,
    display: 'flex',
    flexShrink: 0,
    flexDirection: 'column',
    padding: '5px 0px 5px 10px',
    borderBottom: 'var(--jp-border-width) solid var(--jp-border-color2)'
});
const commitHeaderClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex',
    color: 'var(--jp-ui-font-color2)',
    paddingBottom: '5px'
});
const commitHeaderItemClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    width: '30%',
    paddingLeft: '0.5em',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    textAlign: 'left',
    $nest: {
        '&:first-child': {
            paddingLeft: 0
        }
    }
});
const commitBodyClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    flex: 'auto'
});


/***/ }),

/***/ "./lib/style/PastCommitNode.js":
/*!*************************************!*\
  !*** ./lib/style/PastCommitNode.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   branchClass: () => (/* binding */ branchClass),
/* harmony export */   branchWrapperClass: () => (/* binding */ branchWrapperClass),
/* harmony export */   challengerCommitNodeClass: () => (/* binding */ challengerCommitNodeClass),
/* harmony export */   commitBodyClass: () => (/* binding */ commitBodyClass),
/* harmony export */   commitExpandedClass: () => (/* binding */ commitExpandedClass),
/* harmony export */   commitHeaderClass: () => (/* binding */ commitHeaderClass),
/* harmony export */   commitHeaderItemClass: () => (/* binding */ commitHeaderItemClass),
/* harmony export */   commitWrapperClass: () => (/* binding */ commitWrapperClass),
/* harmony export */   iconButtonClass: () => (/* binding */ iconButtonClass),
/* harmony export */   localBranchClass: () => (/* binding */ localBranchClass),
/* harmony export */   referenceCommitNodeClass: () => (/* binding */ referenceCommitNodeClass),
/* harmony export */   remoteBranchClass: () => (/* binding */ remoteBranchClass),
/* harmony export */   singleFileCommitClass: () => (/* binding */ singleFileCommitClass),
/* harmony export */   workingBranchClass: () => (/* binding */ workingBranchClass)
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);

const commitWrapperClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    flexGrow: 0,
    display: 'flex',
    flexShrink: 0,
    flexDirection: 'column',
    padding: '5px 0px 5px 10px',
    borderBottom: 'var(--jp-border-width) solid var(--jp-border-color2)'
});
const commitHeaderClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex',
    color: 'var(--jp-ui-font-color2)',
    paddingBottom: '5px'
});
const commitHeaderItemClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    width: '30%',
    paddingLeft: '0.5em',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    textAlign: 'left',
    $nest: {
        '&:first-child': {
            paddingLeft: 0
        }
    }
});
const branchWrapperClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex',
    fontSize: '0.8em',
    marginLeft: '-5px'
});
const branchClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    padding: '2px',
    // Special case, regardless of theme, because
    // backgrounds of colors are not based on theme either
    color: 'var(--md-grey-900)',
    border: 'var(--jp-border-width) solid var(--md-grey-700)',
    borderRadius: '4px',
    margin: '3px'
});
const remoteBranchClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    backgroundColor: 'var(--md-blue-100)'
});
const localBranchClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    backgroundColor: 'var(--md-orange-100)'
});
const workingBranchClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    backgroundColor: 'var(--md-red-100)'
});
const commitExpandedClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    backgroundColor: 'var(--jp-layout-color1)'
});
const commitBodyClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    flex: 'auto'
});
const iconButtonClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
// width: '16px',
// height: '16px'
});
const singleFileCommitClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    $nest: {
        '&:hover': {
            backgroundColor: 'var(--jp-layout-color2)'
        }
    }
});
const referenceCommitNodeClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    borderLeft: '6px solid var(--jp-git-diff-deleted-color1)'
});
const challengerCommitNodeClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    borderLeft: '6px solid var(--jp-git-diff-added-color1)'
});


/***/ }),

/***/ "./lib/style/RebaseActionStyle.js":
/*!****************************************!*\
  !*** ./lib/style/RebaseActionStyle.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   rebaseActionStyle: () => (/* binding */ rebaseActionStyle)
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);

const rebaseActionStyle = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    padding: '8px'
});


/***/ }),

/***/ "./lib/style/ResetRevertDialog.js":
/*!****************************************!*\
  !*** ./lib/style/ResetRevertDialog.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   actionsWrapperClass: () => (/* binding */ actionsWrapperClass),
/* harmony export */   buttonClass: () => (/* binding */ buttonClass),
/* harmony export */   cancelButtonClass: () => (/* binding */ cancelButtonClass),
/* harmony export */   closeButtonClass: () => (/* binding */ closeButtonClass),
/* harmony export */   commitDescriptionClass: () => (/* binding */ commitDescriptionClass),
/* harmony export */   commitFormClass: () => (/* binding */ commitFormClass),
/* harmony export */   commitSummaryClass: () => (/* binding */ commitSummaryClass),
/* harmony export */   contentWrapperClass: () => (/* binding */ contentWrapperClass),
/* harmony export */   resetRevertDialogClass: () => (/* binding */ resetRevertDialogClass),
/* harmony export */   submitButtonClass: () => (/* binding */ submitButtonClass),
/* harmony export */   titleClass: () => (/* binding */ titleClass),
/* harmony export */   titleWrapperClass: () => (/* binding */ titleWrapperClass)
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);

const resetRevertDialogClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    height: 'auto',
    width: '380px',
    color: 'var(--jp-ui-font-color1)!important',
    borderRadius: '3px!important',
    backgroundColor: 'var(--jp-layout-color1)!important'
});
const closeButtonClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    position: 'absolute',
    top: '10px',
    right: '12px',
    height: '30px',
    width: '30px',
    padding: 0,
    border: 'none',
    borderRadius: '50%',
    backgroundColor: 'var(--jp-layout-color1)',
    $nest: {
        svg: {
            fill: 'var(--jp-ui-font-color1)'
        },
        '&:hover': {
            backgroundColor: 'var(--jp-border-color2)'
        },
        '&:active': {
            backgroundColor: 'var(--jp-border-color2)'
        }
    }
});
const titleWrapperClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    boxSizing: 'border-box',
    position: 'relative',
    padding: '15px',
    borderBottom: 'var(--jp-border-width) solid var(--jp-border-color2)',
    $nest: {
        '& > p': {
            margin: '0'
        }
    }
});
const titleClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    fontWeight: 700
});
const contentWrapperClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    padding: '15px',
    $nest: {
        '> p': {
            marginBottom: '7px'
        }
    }
});
const actionsWrapperClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    padding: '15px!important',
    borderTop: 'var(--jp-border-width) solid var(--jp-border-color2)'
});
const buttonClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    boxSizing: 'border-box',
    width: '9em',
    height: '2em',
    color: 'white',
    fontSize: 'var(--jp-ui-font-size1)',
    cursor: 'pointer',
    border: '0',
    borderRadius: '3px',
    $nest: {
        '&:disabled': {
            cursor: 'default'
        }
    }
});
const cancelButtonClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    backgroundColor: 'var(--md-grey-500)',
    $nest: {
        '&:hover': {
            backgroundColor: 'var(--md-grey-600)'
        },
        '&:active': {
            backgroundColor: 'var(--md-grey-700)'
        }
    }
});
const submitButtonClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    backgroundColor: 'var(--md-blue-500)',
    $nest: {
        '&:hover': {
            backgroundColor: 'var(--md-blue-600)'
        },
        '&:active': {
            backgroundColor: 'var(--md-blue-700)'
        },
        '&:disabled': {
            color: 'var(--jp-ui-inverse-font-color0)',
            backgroundColor: 'var(--jp-layout-color3)'
        },
        '&:disabled:hover': {
            backgroundColor: 'var(--jp-layout-color3)'
        },
        '&:disabled:active': {
            backgroundColor: 'var(--jp-layout-color3)'
        }
    }
});
const commitFormClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 'auto',
    padding: 0,
    alignItems: 'flex-start',
    backgroundColor: 'var(--jp-layout-color1)'
});
const commitSummaryClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    width: '100%',
    height: '1.5em',
    marginBottom: '1em',
    padding: 'var(--jp-code-padding)',
    outline: 'none',
    overflowX: 'auto',
    color: 'var(--jp-ui-font-color1)',
    fontSize: 'var(--jp-ui-font-size1)',
    fontWeight: 300,
    backgroundColor: 'var(--jp-layout-color1)',
    border: 'var(--jp-border-width) solid var(--jp-border-color2)',
    borderRadius: '3px',
    $nest: {
        '&:active': {
            border: 'var(--jp-border-width) solid var(--jp-brand-color1)'
        },
        '&:focus': {
            border: 'var(--jp-border-width) solid var(--jp-brand-color1)'
        }
    }
});
const commitDescriptionClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    width: '100%',
    marginBottom: '1em',
    padding: 'var(--jp-code-padding)',
    outline: 'none',
    overflowX: 'auto',
    resize: 'none',
    color: 'var(--jp-ui-font-color1)',
    fontSize: 'var(--jp-ui-font-size1)',
    fontWeight: 300,
    backgroundColor: 'var(--jp-layout-color1)',
    border: 'var(--jp-border-width) solid var(--jp-border-color2)',
    borderRadius: '3px',
    $nest: {
        '&:focus': {
            outline: 'none',
            border: 'var(--jp-border-width) solid var(--jp-brand-color1)'
        },
        '&:active': {
            outline: 'none',
            border: 'var(--jp-border-width) solid var(--jp-brand-color1)'
        },
        '&::placeholder': {
            color: 'var(--jp-ui-font-color3)'
        },
        '&::-webkit-input-placeholder': {
            color: 'var(--jp-ui-font-color3)'
        },
        '&::-moz-placeholder': {
            color: 'var(--jp-ui-font-color3)'
        },
        '&::-ms-input-placeholder': {
            color: 'var(--jp-ui-font-color3)'
        }
    }
});


/***/ }),

/***/ "./lib/style/SinglePastCommitInfo.js":
/*!*******************************************!*\
  !*** ./lib/style/SinglePastCommitInfo.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   actionButtonClass: () => (/* binding */ actionButtonClass),
/* harmony export */   commitBodyClass: () => (/* binding */ commitBodyClass),
/* harmony export */   commitClass: () => (/* binding */ commitClass),
/* harmony export */   commitDetailClass: () => (/* binding */ commitDetailClass),
/* harmony export */   commitDetailFileClass: () => (/* binding */ commitDetailFileClass),
/* harmony export */   commitDetailHeaderClass: () => (/* binding */ commitDetailHeaderClass),
/* harmony export */   commitOverviewNumbersClass: () => (/* binding */ commitOverviewNumbersClass),
/* harmony export */   deletionsIconClass: () => (/* binding */ deletionsIconClass),
/* harmony export */   fileListClass: () => (/* binding */ fileListClass),
/* harmony export */   iconClass: () => (/* binding */ iconClass),
/* harmony export */   insertionsIconClass: () => (/* binding */ insertionsIconClass)
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);

const commitClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    flex: '0 0 auto',
    width: '100%',
    fontSize: '12px',
    marginBottom: '10px',
    marginTop: '5px',
    paddingTop: '5px'
});
const commitOverviewNumbersClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    fontSize: '13px',
    fontWeight: 'bold',
    paddingTop: '5px',
    $nest: {
        '& span': {
            alignItems: 'center',
            display: 'inline-flex',
            marginLeft: '5px'
        },
        '& span:nth-of-type(1)': {
            marginLeft: '0px'
        }
    }
});
const commitDetailClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    flex: '1 1 auto',
    margin: '0'
});
const commitDetailHeaderClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    paddingBottom: '0.5em',
    fontSize: '13px',
    fontWeight: 'bold'
});
const commitDetailFileClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    userSelect: 'none',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: 'var(--jp-ui-font-color1)',
    height: 'var(--jp-private-running-item-height)',
    lineHeight: 'var(--jp-private-running-item-height)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    $nest: {
        '&:hover': {
            backgroundColor: 'var(--jp-layout-color2)'
        },
        '&:active': {
            backgroundColor: 'var(--jp-layout-color3)'
        }
    }
});
const iconClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'inline-block',
    width: '13px',
    height: '13px',
    right: '10px'
});
const insertionsIconClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    $nest: {
        '.jp-icon3': {
            fill: 'var(--md-green-500)'
        }
    }
});
const deletionsIconClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    $nest: {
        '.jp-icon3': {
            fill: 'var(--md-red-500)'
        }
    }
});
const fileListClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    $nest: {
        ul: {
            paddingLeft: 0,
            margin: 0
        }
    }
});
const actionButtonClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    float: 'right'
});
const commitBodyClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    paddingTop: '5px',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    margin: '0'
});


/***/ }),

/***/ "./lib/style/StatusWidget.js":
/*!***********************************!*\
  !*** ./lib/style/StatusWidget.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   badgeClass: () => (/* binding */ badgeClass),
/* harmony export */   currentBranchNameClass: () => (/* binding */ currentBranchNameClass),
/* harmony export */   statusAnimatedIconClass: () => (/* binding */ statusAnimatedIconClass),
/* harmony export */   statusIconClass: () => (/* binding */ statusIconClass)
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);

const fillAnimation = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.keyframes)({
    to: { fillOpacity: 1 }
});
const statusIconClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    $nest: {
        '& .jp-icon3': {
            animationName: fillAnimation,
            animationDuration: '1s'
        }
    }
});
const pathAnimation = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.keyframes)({
    '0%': { fillOpacity: 1 },
    '50%': { fillOpacity: 0.6 },
    '100%': { fillOpacity: 1 }
});
const statusAnimatedIconClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    $nest: {
        '& .jp-icon3': {
            animationName: pathAnimation,
            animationDuration: '2s',
            animationIterationCount: 'infinite'
        }
    }
});
const badgeClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    $nest: {
        '& > .MuiBadge-badge': {
            top: 6,
            right: 15,
            backgroundColor: 'var(--jp-warn-color1)'
        }
    }
});
const currentBranchNameClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    fontSize: 'var(--jp-ui-font-size1)',
    lineHeight: '100%'
});


/***/ }),

/***/ "./lib/style/Toolbar.js":
/*!******************************!*\
  !*** ./lib/style/Toolbar.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   badgeClass: () => (/* binding */ badgeClass),
/* harmony export */   spacer: () => (/* binding */ spacer),
/* harmony export */   toolbarButtonClass: () => (/* binding */ toolbarButtonClass),
/* harmony export */   toolbarClass: () => (/* binding */ toolbarClass),
/* harmony export */   toolbarMenuButtonClass: () => (/* binding */ toolbarMenuButtonClass),
/* harmony export */   toolbarMenuButtonEnabledClass: () => (/* binding */ toolbarMenuButtonEnabledClass),
/* harmony export */   toolbarMenuButtonIconClass: () => (/* binding */ toolbarMenuButtonIconClass),
/* harmony export */   toolbarMenuButtonSubtitleClass: () => (/* binding */ toolbarMenuButtonSubtitleClass),
/* harmony export */   toolbarMenuButtonTitleClass: () => (/* binding */ toolbarMenuButtonTitleClass),
/* harmony export */   toolbarMenuButtonTitleWrapperClass: () => (/* binding */ toolbarMenuButtonTitleWrapperClass),
/* harmony export */   toolbarMenuWrapperClass: () => (/* binding */ toolbarMenuWrapperClass),
/* harmony export */   toolbarNavClass: () => (/* binding */ toolbarNavClass)
/* harmony export */ });
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typestyle */ "webpack/sharing/consume/default/typestyle/typestyle");
/* harmony import */ var typestyle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typestyle__WEBPACK_IMPORTED_MODULE_0__);

const toolbarClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'var(--jp-layout-color1)'
});
const toolbarNavClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    minHeight: '35px',
    lineHeight: 'var(--jp-private-running-item-height)',
    backgroundColor: 'var(--jp-layout-color1)',
    borderBottom: 'var(--jp-border-width) solid var(--jp-border-color2)'
});
const toolbarMenuWrapperClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    background: 'var(--jp-layout-color1)'
});
const toolbarMenuButtonClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    minHeight: '50px',
    /* top | right | bottom | left */
    padding: '4px 11px 4px 11px',
    fontSize: 'var(--jp-ui-font-size1)',
    lineHeight: '1.5em',
    color: 'var(--jp-ui-font-color1)',
    textAlign: 'left',
    border: 'none',
    borderBottom: 'var(--jp-border-width) solid var(--jp-border-color2)',
    borderRadius: 0,
    background: 'var(--jp-layout-color1)'
});
const toolbarMenuButtonEnabledClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    $nest: {
        '&:hover': {
            backgroundColor: 'var(--jp-layout-color2)'
        },
        '&:active': {
            backgroundColor: 'var(--jp-layout-color3)'
        }
    }
});
const toolbarMenuButtonIconClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    width: '16px',
    height: '16px',
    /* top | right | bottom | left */
    margin: 'auto 8px auto 0'
});
const toolbarMenuButtonTitleWrapperClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    flexBasis: 0,
    flexGrow: 1,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: 'auto',
    $nest: {
        '& > p': {
            marginTop: 0,
            marginBottom: 0
        }
    }
});
const toolbarMenuButtonTitleClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({});
const toolbarMenuButtonSubtitleClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    marginBottom: 'auto',
    fontWeight: 700
});
// Styles overriding default button style are marked as important to ensure application
const toolbarButtonClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    boxSizing: 'border-box',
    height: '24px',
    width: 'var(--jp-private-running-button-width) !important',
    margin: 'auto 0 auto 0',
    padding: '0px 6px !important',
    $nest: {
        '& span': {
            // Set icon width and centers it
            margin: 'auto',
            width: '16px'
        }
    }
});
const spacer = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    flex: '1 1 auto'
});
const badgeClass = (0,typestyle__WEBPACK_IMPORTED_MODULE_0__.style)({
    $nest: {
        '& > .MuiBadge-badge': {
            top: 12,
            right: 5,
            backgroundColor: 'var(--jp-warn-color1)'
        }
    }
});


/***/ }),

/***/ "./lib/style/icons.js":
/*!****************************!*\
  !*** ./lib/style/icons.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addIcon: () => (/* binding */ addIcon),
/* harmony export */   branchIcon: () => (/* binding */ branchIcon),
/* harmony export */   cloneIcon: () => (/* binding */ cloneIcon),
/* harmony export */   compareWithSelectedIcon: () => (/* binding */ compareWithSelectedIcon),
/* harmony export */   deletionsMadeIcon: () => (/* binding */ deletionsMadeIcon),
/* harmony export */   desktopIcon: () => (/* binding */ desktopIcon),
/* harmony export */   diffIcon: () => (/* binding */ diffIcon),
/* harmony export */   discardIcon: () => (/* binding */ discardIcon),
/* harmony export */   gitIcon: () => (/* binding */ gitIcon),
/* harmony export */   historyIcon: () => (/* binding */ historyIcon),
/* harmony export */   insertionsMadeIcon: () => (/* binding */ insertionsMadeIcon),
/* harmony export */   mergeIcon: () => (/* binding */ mergeIcon),
/* harmony export */   openIcon: () => (/* binding */ openIcon),
/* harmony export */   pullIcon: () => (/* binding */ pullIcon),
/* harmony export */   pushIcon: () => (/* binding */ pushIcon),
/* harmony export */   removeIcon: () => (/* binding */ removeIcon),
/* harmony export */   rewindIcon: () => (/* binding */ rewindIcon),
/* harmony export */   selectForCompareIcon: () => (/* binding */ selectForCompareIcon),
/* harmony export */   tagIcon: () => (/* binding */ tagIcon),
/* harmony export */   trashIcon: () => (/* binding */ trashIcon),
/* harmony export */   verticalMoreIcon: () => (/* binding */ verticalMoreIcon)
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_icons_add_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../style/icons/add.svg */ "./style/icons/add.svg");
/* harmony import */ var _style_icons_branch_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../style/icons/branch.svg */ "./style/icons/branch.svg");
/* harmony import */ var _style_icons_clock_svg__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../style/icons/clock.svg */ "./style/icons/clock.svg");
/* harmony import */ var _style_icons_clone_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../style/icons/clone.svg */ "./style/icons/clone.svg");
/* harmony import */ var _style_icons_compare_with_selected_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../style/icons/compare-with-selected.svg */ "./style/icons/compare-with-selected.svg");
/* harmony import */ var _style_icons_deletions_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../style/icons/deletions.svg */ "./style/icons/deletions.svg");
/* harmony import */ var _style_icons_desktop_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../style/icons/desktop.svg */ "./style/icons/desktop.svg");
/* harmony import */ var _style_icons_diff_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../style/icons/diff.svg */ "./style/icons/diff.svg");
/* harmony import */ var _style_icons_discard_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../style/icons/discard.svg */ "./style/icons/discard.svg");
/* harmony import */ var _style_icons_git_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../style/icons/git.svg */ "./style/icons/git.svg");
/* harmony import */ var _style_icons_insertions_svg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../style/icons/insertions.svg */ "./style/icons/insertions.svg");
/* harmony import */ var _style_icons_merge_svg__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../style/icons/merge.svg */ "./style/icons/merge.svg");
/* harmony import */ var _style_icons_open_file_svg__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../style/icons/open-file.svg */ "./style/icons/open-file.svg");
/* harmony import */ var _style_icons_pull_svg__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../style/icons/pull.svg */ "./style/icons/pull.svg");
/* harmony import */ var _style_icons_push_svg__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../style/icons/push.svg */ "./style/icons/push.svg");
/* harmony import */ var _style_icons_remove_svg__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../style/icons/remove.svg */ "./style/icons/remove.svg");
/* harmony import */ var _style_icons_rewind_svg__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../style/icons/rewind.svg */ "./style/icons/rewind.svg");
/* harmony import */ var _style_icons_select_for_compare_svg__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../style/icons/select-for-compare.svg */ "./style/icons/select-for-compare.svg");
/* harmony import */ var _style_icons_tag_svg__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../style/icons/tag.svg */ "./style/icons/tag.svg");
/* harmony import */ var _style_icons_trash_svg__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../style/icons/trash.svg */ "./style/icons/trash.svg");
/* harmony import */ var _style_icons_vertical_more_svg__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../style/icons/vertical-more.svg */ "./style/icons/vertical-more.svg");

// icon svg import statements





















const gitIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({ name: 'git', svgstr: _style_icons_git_svg__WEBPACK_IMPORTED_MODULE_1__ });
const addIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'git:add',
    svgstr: _style_icons_add_svg__WEBPACK_IMPORTED_MODULE_2__
});
const branchIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'git:branch',
    svgstr: _style_icons_branch_svg__WEBPACK_IMPORTED_MODULE_3__
});
const cloneIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'git:clone',
    svgstr: _style_icons_clone_svg__WEBPACK_IMPORTED_MODULE_4__
});
const compareWithSelectedIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'git:compare-with-selected',
    svgstr: _style_icons_compare_with_selected_svg__WEBPACK_IMPORTED_MODULE_5__
});
const deletionsMadeIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'git:deletions',
    svgstr: _style_icons_deletions_svg__WEBPACK_IMPORTED_MODULE_6__
});
const desktopIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'git:desktop',
    svgstr: _style_icons_desktop_svg__WEBPACK_IMPORTED_MODULE_7__
});
const diffIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'git:diff',
    svgstr: _style_icons_diff_svg__WEBPACK_IMPORTED_MODULE_8__
});
const discardIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'git:discard',
    svgstr: _style_icons_discard_svg__WEBPACK_IMPORTED_MODULE_9__
});
const insertionsMadeIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'git:insertions',
    svgstr: _style_icons_insertions_svg__WEBPACK_IMPORTED_MODULE_10__
});
const historyIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'git:history',
    svgstr: _style_icons_clock_svg__WEBPACK_IMPORTED_MODULE_11__
});
const mergeIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'git:merge',
    svgstr: _style_icons_merge_svg__WEBPACK_IMPORTED_MODULE_12__
});
const openIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'git:open-file',
    svgstr: _style_icons_open_file_svg__WEBPACK_IMPORTED_MODULE_13__
});
const pullIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'git:pull',
    svgstr: _style_icons_pull_svg__WEBPACK_IMPORTED_MODULE_14__
});
const pushIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'git:push',
    svgstr: _style_icons_push_svg__WEBPACK_IMPORTED_MODULE_15__
});
const removeIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'git:remove',
    svgstr: _style_icons_remove_svg__WEBPACK_IMPORTED_MODULE_16__
});
const rewindIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'git:rewind',
    svgstr: _style_icons_rewind_svg__WEBPACK_IMPORTED_MODULE_17__
});
const selectForCompareIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'git:select-for-compare',
    svgstr: _style_icons_select_for_compare_svg__WEBPACK_IMPORTED_MODULE_18__
});
const tagIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'git:tag',
    svgstr: _style_icons_tag_svg__WEBPACK_IMPORTED_MODULE_19__
});
const trashIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'git:trash',
    svgstr: _style_icons_trash_svg__WEBPACK_IMPORTED_MODULE_20__
});
const verticalMoreIcon = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.LabIcon({
    name: 'git:vertical-more',
    svgstr: _style_icons_vertical_more_svg__WEBPACK_IMPORTED_MODULE_21__
});


/***/ }),

/***/ "./lib/svgPathData.js":
/*!****************************!*\
  !*** ./lib/svgPathData.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SVGPathData: () => (/* binding */ SVGPathData)
/* harmony export */ });
// a canvas like api for building an svg path data attribute
class SVGPathData {
    constructor() {
        this._SVGPath = [];
    }
    toString() {
        return this._SVGPath.join(' ');
    }
    moveTo(x, y) {
        this._SVGPath.push(`M ${x},${y}`);
    }
    lineTo(x, y) {
        this._SVGPath.push(`L ${x},${y}`);
    }
    closePath() {
        this._SVGPath.push('Z');
    }
    bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
        this._SVGPath.push(`C ${cp1x}, ${cp1y}, ${cp2x}, ${cp2y}, ${x}, ${y}`);
    }
}


/***/ }),

/***/ "./lib/taskhandler.js":
/*!****************************!*\
  !*** ./lib/taskhandler.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskHandler: () => (/* binding */ TaskHandler)
/* harmony export */ });
/* harmony import */ var _lumino_collections__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/collections */ "webpack/sharing/consume/default/@lumino/collections/@lumino/collections");
/* harmony import */ var _lumino_collections__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_collections__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_2__);



/**
 * A generic task handler
 */
class TaskHandler {
    constructor(model) {
        this._isDisposed = false;
        this._taskList = new _lumino_collections__WEBPACK_IMPORTED_MODULE_0__.LinkedList();
        this._taskChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__.Signal(model);
    }
    /**
     * Boolean indicating whether the handler has been disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * Signal emitted when a task starts
     *
     * 'empty' is emitted each time the task list have processed all tasks
     */
    get taskChanged() {
        return this._taskChanged;
    }
    /**
     * Adds a task to the list of pending model tasks.
     *
     * #Note:
     *  This will add a task name in the queue but the task
     *  execution remains in the hand of the caller.
     *  In particular it is the responsibility of the caller
     *  to call `remove(taskID)` when the task is executed.
     *
     * @param task - task name
     * @returns task identifier
     */
    add(task) {
        // Generate a unique task identifier:
        const id = this._generateTaskID();
        // Add the task to our list of pending tasks:
        this._taskList.addLast({
            id: id,
            task: task
        });
        // If this task is the only task, broadcast the task...
        if (this._taskList.length === 1) {
            this._taskChanged.emit(task);
        }
        // Return the task identifier to allow consumers to remove the task once completed:
        return id;
    }
    /**
     * Dispose of task handler.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._isDisposed = true;
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__.Signal.clearData(this);
    }
    /**
     * Add a asynchronous task to the stack and execute it
     *
     * @param name Name of the task
     * @param callable Asynchronous task to be executed
     *
     * @returns The result of the task
     */
    async execute(name, callable) {
        const taskID = this.add(name);
        try {
            return await callable();
        }
        finally {
            this.remove(taskID);
        }
    }
    /**
     * Removes a task from the list of pending model tasks.
     *
     * @param id - task identifier
     */
    remove(taskID) {
        let node = this._taskList.firstNode;
        // Check the first node...
        if ((node === null || node === void 0 ? void 0 : node.value.id) === taskID) {
            this._taskList.removeNode(node);
        }
        else {
            // Walk the task list looking for a task with the provided identifier...
            while (node === null || node === void 0 ? void 0 : node.next) {
                node = node === null || node === void 0 ? void 0 : node.next;
                if (node.value && node.value.id === taskID) {
                    this._taskList.removeNode(node);
                    break;
                }
            }
        }
        // Check for pending tasks and broadcast the oldest pending task...
        if (this._taskList.length === 0) {
            this._taskChanged.emit('empty');
        }
        else {
            this._taskChanged.emit(this._taskList.first.task);
        }
    }
    /**
     * Generates a unique task identifier.
     *
     * @returns task identifier
     */
    _generateTaskID() {
        return _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__.UUID.uuid4();
    }
}


/***/ }),

/***/ "./lib/tokens.js":
/*!***********************!*\
  !*** ./lib/tokens.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CommandIDs: () => (/* binding */ CommandIDs),
/* harmony export */   ContextCommandIDs: () => (/* binding */ ContextCommandIDs),
/* harmony export */   EXTENSION_ID: () => (/* binding */ EXTENSION_ID),
/* harmony export */   Git: () => (/* binding */ Git),
/* harmony export */   IGitExtension: () => (/* binding */ IGitExtension)
/* harmony export */ });
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/services */ "webpack/sharing/consume/default/@jupyterlab/services");
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_services__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__);


const EXTENSION_ID = 'jupyter.extensions.git_plugin';
const IGitExtension = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__.Token(EXTENSION_ID);
var Git;
(function (Git) {
    let Diff;
    (function (Diff) {
        let SpecialRef;
        (function (SpecialRef) {
            // Working version
            SpecialRef[SpecialRef["WORKING"] = 0] = "WORKING";
            // Index version
            SpecialRef[SpecialRef["INDEX"] = 1] = "INDEX";
            // Common ancestor version (useful for unmerged files)
            SpecialRef[SpecialRef["BASE"] = 2] = "BASE";
        })(SpecialRef = Diff.SpecialRef || (Diff.SpecialRef = {}));
    })(Diff = Git.Diff || (Git.Diff = {}));
    /**
     * Git repository state
     */
    let State;
    (function (State) {
        /**
         * Default state
         */
        State[State["DEFAULT"] = 0] = "DEFAULT";
        /**
         * Detached head state
         */
        State[State["DETACHED"] = 1] = "DETACHED";
        /**
         * Merge in progress
         */
        State[State["MERGING"] = 2] = "MERGING";
        /**
         * Rebase in progress
         */
        State[State["REBASING"] = 3] = "REBASING";
        /**
         * Cherry-pick in progress
         */
        State[State["CHERRY_PICKING"] = 4] = "CHERRY_PICKING";
    })(State = Git.State || (Git.State = {}));
    /**
     * A wrapped error for a fetch response.
     */
    class GitResponseError extends _jupyterlab_services__WEBPACK_IMPORTED_MODULE_0__.ServerConnection.ResponseError {
        /**
         * Create a new response error.
         */
        constructor(response, message = `Invalid response: ${response.status} ${response.statusText}`, traceback = '', json = {}) {
            super(response, message);
            this.traceback = traceback; // traceback added in mother class in 2.2.x
            this._json = json !== null && json !== void 0 ? json : {};
        }
        /**
         * The error response JSON body
         */
        get json() {
            return this._json;
        }
    }
    Git.GitResponseError = GitResponseError;
    class NotInRepository extends Error {
        constructor() {
            super('Not in a Git Repository');
        }
    }
    Git.NotInRepository = NotInRepository;
    class HiddenFile extends Error {
        constructor() {
            super('File is hidden');
            this.name = 'hiddenFile';
            this.message = 'File is hidden and cannot be accessed.';
        }
    }
    Git.HiddenFile = HiddenFile;
})(Git || (Git = {}));
/**
 * The command IDs used in the git context menus.
 */
var ContextCommandIDs;
(function (ContextCommandIDs) {
    ContextCommandIDs["gitCommitAmendStaged"] = "git:context-commitAmendStaged";
    ContextCommandIDs["gitFileAdd"] = "git:context-add";
    ContextCommandIDs["gitFileDiff"] = "git:context-diff";
    ContextCommandIDs["gitFileDiscard"] = "git:context-discard";
    ContextCommandIDs["gitFileDelete"] = "git:context-delete";
    ContextCommandIDs["gitFileOpen"] = "git:context-open";
    ContextCommandIDs["gitFileUnstage"] = "git:context-unstage";
    ContextCommandIDs["gitFileStage"] = "git:context-stage";
    ContextCommandIDs["gitFileTrack"] = "git:context-track";
    ContextCommandIDs["gitFileHistory"] = "git:context-history";
    ContextCommandIDs["gitIgnore"] = "git:context-ignore";
    ContextCommandIDs["gitIgnoreExtension"] = "git:context-ignoreExtension";
    ContextCommandIDs["gitNoAction"] = "git:no-action";
    ContextCommandIDs["openFileFromDiff"] = "git:open-file-from-diff";
    ContextCommandIDs["gitFileStashPop"] = "git:context-stash-pop";
    ContextCommandIDs["gitTagAdd"] = "git:context-tag-add";
})(ContextCommandIDs || (ContextCommandIDs = {}));
/**
 * The command IDs used by the git plugin.
 */
var CommandIDs;
(function (CommandIDs) {
    CommandIDs["gitUI"] = "git:ui";
    CommandIDs["gitTerminalCommand"] = "git:terminal-command";
    CommandIDs["gitInit"] = "git:init";
    CommandIDs["gitOpenUrl"] = "git:open-url";
    CommandIDs["gitToggleSimpleStaging"] = "git:toggle-simple-staging";
    CommandIDs["gitToggleDoubleClickDiff"] = "git:toggle-double-click-diff";
    CommandIDs["gitManageRemote"] = "git:manage-remote";
    CommandIDs["gitClone"] = "git:clone";
    CommandIDs["gitMerge"] = "git:merge";
    CommandIDs["gitOpenGitignore"] = "git:open-gitignore";
    CommandIDs["gitPush"] = "git:push";
    CommandIDs["gitPull"] = "git:pull";
    CommandIDs["gitRebase"] = "git:rebase";
    CommandIDs["gitResolveRebase"] = "git:resolve-rebase";
    CommandIDs["gitResetToRemote"] = "git:reset-to-remote";
    CommandIDs["gitSubmitCommand"] = "git:submit-commit";
    CommandIDs["gitShowDiff"] = "git:show-diff";
    CommandIDs["gitStash"] = "git:stash";
    CommandIDs["gitStashPop"] = "git:stash-pop";
    CommandIDs["gitStashList"] = "git:stash-list";
})(CommandIDs || (CommandIDs = {}));


/***/ }),

/***/ "./lib/utils.js":
/*!**********************!*\
  !*** ./lib/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decodeStage: () => (/* binding */ decodeStage),
/* harmony export */   extractFilename: () => (/* binding */ extractFilename),
/* harmony export */   openFileDiff: () => (/* binding */ openFileDiff),
/* harmony export */   sleep: () => (/* binding */ sleep),
/* harmony export */   stopPropagationWrapper: () => (/* binding */ stopPropagationWrapper)
/* harmony export */ });
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tokens */ "./lib/tokens.js");


/** Get the filename from a path */
function extractFilename(path) {
    if (path[path.length - 1] === '/') {
        return path;
    }
    else {
        return _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PathExt.basename(path);
    }
}
/**
 * Wrap mouse event handler to stop event propagation
 * @param fn Mouse event handler
 * @returns Mouse event handler that stops event from propagating
 */
function stopPropagationWrapper(fn) {
    return (event) => {
        event === null || event === void 0 ? void 0 : event.stopPropagation();
        fn(event);
    };
}
function decodeStage(x, y) {
    var _a;
    /**
     * All combinations of statuses for merge conflicts
     * @see https://git-scm.com/docs/git-status#_short_format
     */
    const unmergedCombinations = {
        D: ['D', 'U'],
        A: ['U', 'A'],
        U: ['D', 'A', 'U']
    };
    // If the file has a merge conflict
    if (((_a = unmergedCombinations[x]) !== null && _a !== void 0 ? _a : []).includes(y)) {
        return 'unmerged';
    }
    // If file is untracked
    if (x === '?' && y === '?') {
        return 'untracked';
    }
    else {
        // If file is staged
        if (x !== ' ') {
            return y !== ' ' ? 'partially-staged' : 'staged';
        }
        // If file is unstaged but tracked
        if (y !== ' ') {
            return 'unstaged';
        }
    }
    return null;
}
/**
 * Returns a promise which resolves after a specified duration.
 *
 * @param ms - duration (in milliseconds)
 * @returns a promise
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
/**
 * A callback function to display a file diff between two commits.
 * @param commands the command registry.
 * @returns a callback function to display a file diff.
 */
const openFileDiff = (commands) => 
/**
 * A callback function to display a file diff between two commits.
 *
 * @param commit Commit data.
 * @param previousCommit Previous commit data to display the diff against. If not specified, the diff will be against the preceding commit.
 *
 * @returns A callback function.
 */
(commit, previousCommit) => 
/**
 * Returns a callback to be invoked on click to display a file diff.
 *
 * @param filePath file path.
 * @param isText indicates whether the file supports displaying a diff.
 * @param previousFilePath when file has been relocated.
 * @returns callback.
 */
(filePath, isText, previousFilePath) => 
/**
 * Callback invoked upon clicking to display a file diff.
 *
 * @param event - event object
 */
async (event) => {
    var _a;
    // Prevent the commit component from being collapsed:
    event === null || event === void 0 ? void 0 : event.stopPropagation();
    if (isText) {
        try {
            commands.execute(_tokens__WEBPACK_IMPORTED_MODULE_1__.ContextCommandIDs.gitFileDiff, {
                files: [
                    {
                        filePath,
                        previousFilePath,
                        isText,
                        context: {
                            previousRef: (_a = previousCommit === null || previousCommit === void 0 ? void 0 : previousCommit.commit) !== null && _a !== void 0 ? _a : commit.pre_commits[0],
                            currentRef: commit.commit
                        }
                    }
                ]
            });
        }
        catch (err) {
            console.error(`Failed to open diff view for ${filePath}.\n${err}`);
        }
    }
};


/***/ }),

/***/ "./lib/version.js":
/*!************************!*\
  !*** ./lib/version.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   version: () => (/* binding */ version)
/* harmony export */ });
// generated by genversion
const version = '0.0.2';


/***/ }),

/***/ "./lib/widgets/AdvancedPushForm.js":
/*!*****************************************!*\
  !*** ./lib/widgets/AdvancedPushForm.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdvancedPushForm: () => (/* binding */ AdvancedPushForm)
/* harmony export */ });
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_0__);

/**
 * A widget form with advanced push options,
 * can be used as a Dialog body.
 */
class AdvancedPushForm extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__.Widget {
    constructor(trans, model) {
        super();
        this._trans = trans;
        this._model = model;
        this._radioButtons = [];
        this.node.appendChild(this.createBody());
        this.addRemoteOptions();
    }
    createBody() {
        const mainNode = document.createElement('div');
        // Instructional text
        const text = document.createElement('div');
        text.className = 'jp-remote-text';
        text.textContent = this._trans.__('Choose a remote to push to.');
        // List of remotes
        const remoteOptionsContainer = document.createElement('div');
        remoteOptionsContainer.className = 'jp-remote-options-wrapper';
        const loadingMessage = document.createElement('div');
        loadingMessage.textContent = this._trans.__('Loading remote repositories...');
        remoteOptionsContainer.appendChild(loadingMessage);
        this._remoteOptionsContainer = remoteOptionsContainer;
        // Force option
        const forceCheckboxContainer = document.createElement('label');
        forceCheckboxContainer.className = 'jp-force-box-container';
        this._forceCheckbox = document.createElement('input');
        this._forceCheckbox.type = 'checkbox';
        this._forceCheckbox.checked = false;
        const label = document.createElement('span');
        label.textContent = this._trans.__('Force Push');
        forceCheckboxContainer.appendChild(this._forceCheckbox);
        forceCheckboxContainer.appendChild(label);
        mainNode.appendChild(text);
        mainNode.appendChild(remoteOptionsContainer);
        mainNode.appendChild(forceCheckboxContainer);
        return mainNode;
    }
    async addRemoteOptions() {
        const remotes = await this._model.getRemotes();
        this._remoteOptionsContainer.innerHTML = '';
        if (remotes.length > 0) {
            remotes.forEach(remote => {
                const buttonWrapper = document.createElement('div');
                buttonWrapper.className = 'jp-button-wrapper';
                const radioButton = document.createElement('input');
                radioButton.type = 'radio';
                radioButton.id = remote.name;
                radioButton.value = remote.name;
                radioButton.name = 'option';
                radioButton.className = 'jp-option';
                if (remote.name === 'origin') {
                    radioButton.checked = true;
                }
                this._radioButtons.push(radioButton);
                const label = document.createElement('label');
                label.htmlFor = remote.name;
                label.textContent = `${remote.name}: ${remote.url}`;
                buttonWrapper.appendChild(radioButton);
                buttonWrapper.appendChild(label);
                this._remoteOptionsContainer.appendChild(buttonWrapper);
            });
        }
        else {
            const noRemoteMsg = document.createElement('div');
            noRemoteMsg.textContent = this._trans.__('This repository has no known remotes.');
            this._remoteOptionsContainer.appendChild(noRemoteMsg);
        }
    }
    getValue() {
        var _a, _b;
        return {
            remoteName: (_b = (_a = this._radioButtons.find(rb => rb.checked)) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : '',
            force: this._forceCheckbox.checked
        };
    }
}


/***/ }),

/***/ "./lib/widgets/AuthorBox.js":
/*!**********************************!*\
  !*** ./lib/widgets/AuthorBox.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GitAuthorForm: () => (/* binding */ GitAuthorForm)
/* harmony export */ });
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_1__);


/**
 * The UI for the commit author form
 */
class GitAuthorForm extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_1__.Widget {
    constructor({ author, trans }) {
        super();
        this._populateForm(author, trans);
    }
    _populateForm(author, trans) {
        trans !== null && trans !== void 0 ? trans : (trans = _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__.nullTranslator.load('jupyterlab_git'));
        const nameLabel = document.createElement('label');
        nameLabel.textContent = trans.__('Committer name:');
        const emailLabel = document.createElement('label');
        emailLabel.textContent = trans.__('Committer email:');
        this._name = nameLabel.appendChild(document.createElement('input'));
        this._email = emailLabel.appendChild(document.createElement('input'));
        this._name.placeholder = 'Name';
        this._email.type = 'text';
        this._email.placeholder = 'Email';
        this._email.type = 'email';
        this._name.value = author.name;
        this._email.value = author.email;
        this.node.appendChild(nameLabel);
        this.node.appendChild(emailLabel);
    }
    /**
     * Returns the input value.
     */
    getValue() {
        const credentials = {
            name: this._name.value,
            email: this._email.value
        };
        return credentials;
    }
}


/***/ }),

/***/ "./lib/widgets/CredentialsBox.js":
/*!***************************************!*\
  !*** ./lib/widgets/CredentialsBox.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GitCredentialsForm: () => (/* binding */ GitCredentialsForm)
/* harmony export */ });
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_0__);

/**
 * The UI for the credentials form
 */
class GitCredentialsForm extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__.Widget {
    constructor(trans, textContent = trans.__('Enter credentials for remote repository'), warningContent = '', passwordPlaceholder = trans.__('password / personal access token')) {
        super();
        this._trans = trans;
        this._passwordPlaceholder = passwordPlaceholder;
        this.node.appendChild(this.createBody(textContent, warningContent));
    }
    createBody(textContent, warningContent) {
        const node = document.createElement('div');
        const label = document.createElement('label');
        const checkboxLabel = document.createElement('label');
        this._checkboxCacheCredentials = document.createElement('input');
        const checkboxText = document.createElement('span');
        this._user = document.createElement('input');
        this._user.type = 'text';
        this._password = document.createElement('input');
        this._password.type = 'password';
        const text = document.createElement('span');
        const warning = document.createElement('div');
        node.className = 'jp-CredentialsBox';
        warning.className = 'jp-CredentialsBox-warning';
        text.textContent = textContent;
        warning.textContent = warningContent;
        this._user.placeholder = this._trans.__('username');
        this._password.placeholder = this._passwordPlaceholder;
        checkboxLabel.className = 'jp-CredentialsBox-label-checkbox';
        this._checkboxCacheCredentials.type = 'checkbox';
        checkboxText.textContent = this._trans.__('Save my login temporarily');
        label.appendChild(text);
        label.appendChild(this._user);
        label.appendChild(this._password);
        node.appendChild(label);
        node.appendChild(warning);
        checkboxLabel.appendChild(this._checkboxCacheCredentials);
        checkboxLabel.appendChild(checkboxText);
        node.appendChild(checkboxLabel);
        return node;
    }
    /**
     * Returns the input value.
     */
    getValue() {
        return {
            username: this._user.value,
            password: this._password.value,
            cache_credentials: this._checkboxCacheCredentials.checked
        };
    }
}


/***/ }),

/***/ "./lib/widgets/GitCloneForm.js":
/*!*************************************!*\
  !*** ./lib/widgets/GitCloneForm.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GitCloneForm: () => (/* binding */ GitCloneForm)
/* harmony export */ });
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_0__);

/**
 * The UI for the form fields shown within the Clone modal.
 */
class GitCloneForm extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__.Widget {
    /**
     * Create a redirect form.
     * @param translator - The language translator
     */
    constructor(trans) {
        super({ node: GitCloneForm.createFormNode(trans) });
    }
    /**
     * Returns the input value.
     */
    getValue() {
        return {
            url: encodeURIComponent(this.node.querySelector('#input-link').value.trim()),
            versioning: Boolean(encodeURIComponent(this.node.querySelector('#download').checked)),
            submodules: Boolean(encodeURIComponent(this.node.querySelector('#submodules').checked))
        };
    }
    static createFormNode(trans) {
        const node = document.createElement('div');
        const inputWrapper = document.createElement('div');
        const inputLinkLabel = document.createElement('label');
        const inputLink = document.createElement('input');
        const linkText = document.createElement('span');
        const checkboxWrapper = document.createElement('div');
        const subModulesLabel = document.createElement('label');
        const subModules = document.createElement('input');
        const downloadLabel = document.createElement('label');
        const download = document.createElement('input');
        node.className = 'jp-CredentialsBox';
        inputWrapper.className = 'jp-RedirectForm';
        checkboxWrapper.className = 'jp-CredentialsBox-wrapper';
        subModulesLabel.className = 'jp-CredentialsBox-label-checkbox';
        downloadLabel.className = 'jp-CredentialsBox-label-checkbox';
        subModules.id = 'submodules';
        download.id = 'download';
        inputLink.id = 'input-link';
        linkText.textContent = trans.__('Enter the URI of the remote Git repository');
        inputLink.placeholder = 'https://host.com/org/repo.git';
        subModulesLabel.textContent = trans.__('Include submodules');
        subModulesLabel.title = trans.__('If checked, the remote submodules in the repository will be cloned recursively');
        subModules.setAttribute('type', 'checkbox');
        subModules.setAttribute('checked', 'checked');
        downloadLabel.textContent = trans.__('Download the repository');
        downloadLabel.title = trans.__('If checked, the remote repository default branch will be downloaded instead of cloned');
        download.setAttribute('type', 'checkbox');
        inputLinkLabel.appendChild(linkText);
        inputLinkLabel.appendChild(inputLink);
        inputWrapper.append(inputLinkLabel);
        subModulesLabel.prepend(subModules);
        checkboxWrapper.appendChild(subModulesLabel);
        downloadLabel.prepend(download);
        checkboxWrapper.appendChild(downloadLabel);
        node.appendChild(inputWrapper);
        node.appendChild(checkboxWrapper);
        return node;
    }
}


/***/ }),

/***/ "./lib/widgets/GitResetToRemoteForm.js":
/*!*********************************************!*\
  !*** ./lib/widgets/GitResetToRemoteForm.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CheckboxForm: () => (/* binding */ CheckboxForm)
/* harmony export */ });
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_0__);

/**
 * A widget form containing a text block and a checkbox,
 * can be used as a Dialog body.
 */
class CheckboxForm extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__.Widget {
    constructor(textBody, checkboxLabel) {
        super();
        this.node.appendChild(this.createBody(textBody, checkboxLabel));
    }
    createBody(textBody, checkboxLabel) {
        const mainNode = document.createElement('div');
        const text = document.createElement('div');
        text.textContent = textBody;
        const checkboxContainer = document.createElement('label');
        this._checkbox = document.createElement('input');
        this._checkbox.type = 'checkbox';
        this._checkbox.checked = true;
        const label = document.createElement('span');
        label.textContent = checkboxLabel;
        checkboxContainer.appendChild(this._checkbox);
        checkboxContainer.appendChild(label);
        mainNode.appendChild(text);
        mainNode.appendChild(checkboxContainer);
        return mainNode;
    }
    getValue() {
        return {
            checked: this._checkbox.checked
        };
    }
}


/***/ }),

/***/ "./lib/widgets/GitWidget.js":
/*!**********************************!*\
  !*** ./lib/widgets/GitWidget.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GitWidget: () => (/* binding */ GitWidget)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_GitPanel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/GitPanel */ "./lib/components/GitPanel.js");
/* harmony import */ var _style_GitWidgetStyle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../style/GitWidgetStyle */ "./lib/style/GitWidgetStyle.js");




/**
 * A class that exposes the git plugin Widget.
 */
class GitWidget extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ReactWidget {
    constructor(model, settings, commands, fileBrowserModel, trans, options) {
        super();
        this.node.id = 'GitSession-root';
        this.addClass(_style_GitWidgetStyle__WEBPACK_IMPORTED_MODULE_2__.gitWidgetStyle);
        this._trans = trans;
        this._commands = commands;
        this._fileBrowserModel = fileBrowserModel;
        this._model = model;
        this._settings = settings;
        // Add refresh standby condition if this widget is hidden
        model.refreshStandbyCondition = () => !this._settings.composite['refreshIfHidden'] && this.isHidden;
    }
    /**
     * A message handler invoked on a `'before-show'` message.
     *
     * #### Notes
     * The default implementation of this handler is a no-op.
     */
    onBeforeShow(msg) {
        // Trigger refresh when the widget is displayed
        this._model.refresh().catch(error => {
            console.error('Fail to refresh model when displaying GitWidget.', error);
        });
        super.onBeforeShow(msg);
    }
    /**
     * Render the content of this widget using the virtual DOM.
     *
     * This method will be called anytime the widget needs to be rendered, which
     * includes layout triggered rendering.
     */
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_1__.createElement(_components_GitPanel__WEBPACK_IMPORTED_MODULE_3__.GitPanel, { commands: this._commands, filebrowser: this._fileBrowserModel, model: this._model, settings: this._settings, trans: this._trans }));
    }
}


/***/ }),

/***/ "./lib/widgets/discardAllChanges.js":
/*!******************************************!*\
  !*** ./lib/widgets/discardAllChanges.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   discardAllChanges: () => (/* binding */ discardAllChanges)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Discard changes in all unstaged and staged files
 *
 * @param isFallback If dialog is called when the classical pull operation fails
 */
async function discardAllChanges(model, trans, isFallback) {
    const result = await (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
        title: trans.__('Discard all changes'),
        body: isFallback
            ? trans.__('Your current changes forbid pulling the latest changes. Do you want to permanently discard those changes? This action cannot be undone.')
            : trans.__('Are you sure you want to permanently discard changes to all files? This action cannot be undone.'),
        buttons: [
            _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.cancelButton({ label: trans.__('Cancel') }),
            _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.warnButton({ label: trans.__('Discard') })
        ]
    });
    if (result.button.accept) {
        try {
            return model.resetToCommit('HEAD');
        }
        catch (reason) {
            (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)(trans.__('Discard all changes failed.'), reason);
            return Promise.reject(reason);
        }
    }
    return Promise.reject({
        cancelled: true,
        message: 'The user refused to discard all changes'
    });
}


/***/ }),

/***/ "./style/icons/add.svg":
/*!*****************************!*\
  !*** ./style/icons/add.svg ***!
  \*****************************/
/***/ ((module) => {

module.exports = "<svg\n   xmlns=\"http://www.w3.org/2000/svg\"\n   width=\"16\"\n   viewBox=\"0 0 24 24\"\n   version=\"1.1\">\n  <g\n     class=\"jp-icon3 jp-icon-selectable\"\n     fill=\"#4F4F4F\">\n    <path\n       d=\"m 22,13 h -9 v 9 H 11 V 13 H 2 v -2 h 9 V 2 h 2 v 9 h 9 z\"/>\n  </g>\n</svg>\n";

/***/ }),

/***/ "./style/icons/branch.svg":
/*!********************************!*\
  !*** ./style/icons/branch.svg ***!
  \********************************/
/***/ ((module) => {

module.exports = "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" viewBox=\"0 0 18 18\">\n<path class=\"jp-icon3 jp-icon-selectable\" d=\"M12.499,3.177 C11.205,3.177 10.166,4.216 10.166,5.51 C10.166,6.366 10.64,7.114 11.333,7.515 L11.333,7.843 C11.333,9.009 10.166,10.176 9,10.176 C8.034,10.176 7.269,10.376 6.667,10.704 L6.667,5.182 C7.36,4.781 7.834,4.034 7.834,3.177 C7.834,1.883 6.795,0.844 5.501,0.844 C4.207,0.844 3.168,1.883 3.168,3.177 C3.168,4.034 3.642,4.781 4.334,5.182 L4.334,12.818 C3.642,13.219 3.168,13.966 3.168,14.823 C3.168,16.117 4.207,17.156 5.501,17.156 C6.795,17.156 7.834,16.117 7.834,14.823 C7.834,14.203 7.597,13.656 7.214,13.237 C7.56,12.818 8.107,12.49 9,12.49 C11.333,12.49 13.666,10.157 13.666,7.824 L13.666,7.496 C14.358,7.095 14.832,6.348 14.832,5.492 C14.832,4.198 13.793,3.159 12.499,3.159 z M5.501,2.011 C6.139,2.011 6.667,2.539 6.667,3.177 C6.667,3.815 6.139,4.344 5.501,4.344 C4.863,4.344 4.334,3.815 4.334,3.177 C4.334,2.539 4.863,2.011 5.501,2.011 z M5.501,16.008 C4.863,16.008 4.334,15.479 4.334,14.841 C4.334,14.203 4.863,13.675 5.501,13.675 C6.139,13.675 6.667,14.203 6.667,14.841 C6.667,15.479 6.139,16.008 5.501,16.008 z M12.499,6.676 C11.861,6.676 11.333,6.148 11.333,5.51 C11.333,4.872 11.861,4.344 12.499,4.344 C13.137,4.344 13.666,4.872 13.666,5.51 C13.666,6.148 13.137,6.676 12.499,6.676 z\" fill=\"#4F4F4F\"/>\n</svg>\n";

/***/ }),

/***/ "./style/icons/clock.svg":
/*!*******************************!*\
  !*** ./style/icons/clock.svg ***!
  \*******************************/
/***/ ((module) => {

module.exports = "<svg\n  aria-hidden=\"true\"\n  role=\"img\"\n  xmlns=\"http://www.w3.org/2000/svg\"\n  width=\"16\"\n  viewBox=\"0 0 512 512\"\n>\n  <path\n    class=\"jp-icon3\"\n    fill=\"currentColor\"\n    d=\"M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z\"\n  ></path>\n</svg>\n";

/***/ }),

/***/ "./style/icons/clone.svg":
/*!*******************************!*\
  !*** ./style/icons/clone.svg ***!
  \*******************************/
/***/ ((module) => {

module.exports = "<svg width=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<g class=\"jp-icon3\" fill=\"#616161\">\n<path d=\"M18.3438 13.2365L10.7648 5.65849C10.3311 5.22492 9.61471 5.22492 9.18108 5.65849L7.61625 7.22311L9.61471 9.2213C10.086 9.07049 10.6139 9.16474 10.9721 9.54176C11.3492 9.91878 11.4435 10.4466 11.2927 10.9179L13.2157 12.8407C13.687 12.6898 14.2149 12.7841 14.592 13.1611C15.1199 13.6701 15.1199 14.5184 14.592 15.0462C14.0641 15.574 13.2345 15.574 12.7067 15.0462C12.3107 14.6503 12.2165 14.0848 12.4239 13.5947L10.6328 11.8039V16.5166C10.7648 16.5731 10.8779 16.6674 10.991 16.7616C11.5189 17.2894 11.5189 18.1189 10.991 18.6467C10.4631 19.1557 9.63356 19.1557 9.10567 18.6467C8.57777 18.1189 8.57777 17.2894 9.10567 16.7616C9.23764 16.6297 9.38847 16.5354 9.53929 16.4789V11.7096C9.38847 11.6531 9.23764 11.5399 9.10567 11.4268C8.70975 11.031 8.61548 10.4654 8.82287 9.97533L6.84326 8.01484L1.65859 13.1988C1.22497 13.6324 1.22497 14.3487 1.65859 14.7823L9.21879 22.3415C9.65241 22.775 10.3688 22.775 10.8025 22.3415L18.325 14.82C18.7774 14.3676 18.7774 13.6701 18.3438 13.2365Z\"/>\n<rect x=\"14.6666\" y=\"5.33331\" width=\"6.66667\" height=\"1.33333\"/>\n<rect x=\"18.6666\" y=\"2.66669\" width=\"6.66667\" height=\"1.33333\" transform=\"rotate(90 18.6666 2.66669)\"/>\n</g>\n</svg>\n";

/***/ }),

/***/ "./style/icons/compare-with-selected.svg":
/*!***********************************************!*\
  !*** ./style/icons/compare-with-selected.svg ***!
  \***********************************************/
/***/ ((module) => {

module.exports = "<svg width=\"16\" viewBox=\"0 0 15 15\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n  <g class=\"jp-icon3 jp-icon-selectable\" fill=\"#4F4F4F\">\n    <path d=\"M9.5 1H3.5C2.675 1 2.0075 1.63 2.0075 2.4L2 13.6C2 14.37 2.6675 15 3.4925 15H12.5C13.325 15 14 14.37 14 13.6V5.2L9.5 1ZM3.5 13.6V2.4H8.75L12.5 5.9V13.6H3.5Z\" />\n    <path d=\"M5,8 L5,9 L7,9 L7,11 L11,8 L7,5 L7,7 L5,7 z\" transform=\"rotate(180 7.75 8)\" />\n  </g>\n</svg>";

/***/ }),

/***/ "./style/icons/deletions.svg":
/*!***********************************!*\
  !*** ./style/icons/deletions.svg ***!
  \***********************************/
/***/ ((module) => {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" viewBox=\"0 0 24 24\">\n    <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n    <path class=\"jp-icon3\" fill=\"white\" d=\"M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z\"/>\n</svg>\n";

/***/ }),

/***/ "./style/icons/desktop.svg":
/*!*********************************!*\
  !*** ./style/icons/desktop.svg ***!
  \*********************************/
/***/ ((module) => {

module.exports = "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" viewBox=\"0 0 24 24\">\n  <path class=\"jp-icon3\" d=\"M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7l-2 3v1h8v-1l-2-3h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 12H3V4h18v10z\" fill=\"#4F4F4F\">\n  </path>\n</svg>";

/***/ }),

/***/ "./style/icons/diff.svg":
/*!******************************!*\
  !*** ./style/icons/diff.svg ***!
  \******************************/
/***/ ((module) => {

module.exports = "<svg width=\"16\" viewBox=\"0 0 15 15\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n  <g class=\"jp-icon3 jp-icon-selectable\" fill=\"#4F4F4F\">\n    <path d=\"M9.5 1H3.5C2.675 1 2.0075 1.63 2.0075 2.4L2 13.6C2 14.37 2.6675 15 3.4925 15H12.5C13.325 15 14 14.37 14 13.6V5.2L9.5 1ZM3.5 13.6V2.4H8.75L12.5 5.9V13.6H3.5Z\"/>\n    <rect x=\"7\" y=\"10.5\" width=\"4\" height=\"0.999998\"/>\n    <rect x=\"5\" y=\"5.49988\" width=\"4\" height=\"0.999998\"/>\n    <rect x=\"7.5\" y=\"4\" width=\"4\" height=\"1\" transform=\"rotate(90 7.5 4)\"/>\n  </g>\n</svg>\n";

/***/ }),

/***/ "./style/icons/discard.svg":
/*!*********************************!*\
  !*** ./style/icons/discard.svg ***!
  \*********************************/
/***/ ((module) => {

module.exports = "<svg\n   xmlns=\"http://www.w3.org/2000/svg\"\n   width=\"16\"\n   viewBox=\"0 0 24 24\"\n   version=\"1.1\">\n  <g class=\"jp-icon3 jp-icon-selectable\" stroke=\"#4F4F4F\" stroke-width=\"2px\">\n    <path\n       fill=\"none\"\n       d=\"m 8.9223529,22.334118 c 0,0 8.2027491,-6.710405 10.3905881,-10.164706 C 21.50078,8.7151116 20.317794,5.8252391 17.957647,3.5011764 15.597501,1.1771138 12.452863,1.6307769 9.8541176,2.1458824 7.2553727,2.6609879 3.1905882,5.8164706 3.1905882,5.8164706\" \n      />\n    <path\n       fill=\"none\"\n       d=\"M 5.3082353,0.90352943 3.1905882,5.8164706 8.0752941,6.6070589\"\n      />\n  </g>\n</svg>\n";

/***/ }),

/***/ "./style/icons/git.svg":
/*!*****************************!*\
  !*** ./style/icons/git.svg ***!
  \*****************************/
/***/ ((module) => {

module.exports = "<svg\n  xmlns=\"http://www.w3.org/2000/svg\"\n  viewBox=\"0 0 20 20\"\n  width=\"16\"\n>\n  <path\n    class=\"jp-icon3 jp-icon-selectable\"\n    d=\"M19.6 9.1 10.9 0.4c-0.5-0.5-1.3-0.5-1.8 0l-1.8 1.8 2.3 2.3c0.5-0.2 1.1-0.1 1.6 0.4 0.4 0.4 0.5 1 0.4 1.6l2.2 2.2c0.5-0.2 1.2-0.1 1.6 0.4 0.6 0.6 0.6 1.6 0 2.2-0.6 0.6-1.6 0.6-2.2 0C12.7 10.7 12.6 10.1 12.8 9.5l-2.1-2.1v5.4c0.1 0.1 0.3 0.2 0.4 0.3 0.6 0.6 0.6 1.6 0 2.2-0.6 0.6-1.6 0.6-2.2 0-0.6-0.6-0.6-1.6 0-2.2 0.1-0.1 0.3-0.3 0.5-0.3V7.4C9.3 7.3 9.1 7.2 9 7 8.5 6.6 8.4 5.9 8.6 5.3L6.4 3.1 0.4 9.1c-0.5 0.5-0.5 1.3 0 1.8l8.7 8.7c0.5 0.5 1.3 0.5 1.8 0l8.7-8.7c0.5-0.5 0.5-1.3 0-1.8\"\n    fill=\"#616161\"\n  />\n</svg>\n";

/***/ }),

/***/ "./style/icons/insertions.svg":
/*!************************************!*\
  !*** ./style/icons/insertions.svg ***!
  \************************************/
/***/ ((module) => {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" viewBox=\"0 0 24 24\">\n    <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n    <path class=\"jp-icon3\" fill=\"white\" d=\"M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z\"/>\n</svg>\n";

/***/ }),

/***/ "./style/icons/merge.svg":
/*!*******************************!*\
  !*** ./style/icons/merge.svg ***!
  \*******************************/
/***/ ((module) => {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"16\">\n  <path class=\"jp-icon3\" fill=\"#4F4F4F\"\n    d=\"M5.59 1.5c-2.041.023-3.607 2.277-2.958 4.202.346 1.087 1.299 1.946 2.404 2.211-.062 2.722-.036 5.448-.02 8.171-2.08.393-3.226 3.07-2.055 4.836.898 1.555 3.134 2.098 4.604 1.033 1.56-1.024 1.945-3.427.656-4.82-.47-.58-.783-.861-1.722-1.102-.004-1.233-.008-3.364-.007-4.596 1.281 1.648 3.342 2.65 5.436 2.555 1.052.03 2.105.015 3.157.011.414 1.848 2.597 3.043 4.361 2.285 1.804-.682 2.655-3.088 1.594-4.725-.99-1.698-3.596-2.12-5-.692-.538.426-.664 1.019-.86 1.63-1.68-.055-4.554.254-6.053-.702-1.39-.825-2.392-2.3-2.576-3.913 1.963-.439 3.092-2.914 2.074-4.669C8.053 2.124 6.81 1.458 5.59 1.5zm.026 1.515c1.26-.18 2.305 1.278 1.736 2.413-.446 1.301-2.442 1.454-3.081.237-.73-1.057.058-2.619 1.345-2.65zm12.501 8.502c1.26-.182 2.301 1.276 1.735 2.41-.445 1.301-2.442 1.455-3.082.238-.727-1.056.062-2.617 1.347-2.648zm-12.5 6c1.26-.183 2.304 1.275 1.735 2.41-.446 1.3-2.44 1.454-3.081.238-.73-1.055.06-2.617 1.345-2.648z\" />\n</svg>";

/***/ }),

/***/ "./style/icons/open-file.svg":
/*!***********************************!*\
  !*** ./style/icons/open-file.svg ***!
  \***********************************/
/***/ ((module) => {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" viewBox=\"0 0 15 15\">\n  <g class=\"jp-icon3 jp-icon-selectable\" fill=\"#4F4F4F\">\n    <path\n       d=\"m 6.5,1 h 6 c 0.825,0 1.4925,0.63 1.4925,1.4 L 14,13.6 C 14,14.37 13.3325,15 12.5075,15 H 3.5 C 2.675,15 2,14.37 2,13.6 V 5.2 Z m 6,12.6 V 2.4 H 7.25 L 3.5,5.9 v 7.7 z\"/>\n    <path\n       d=\"M 7.5195314,11.679686 V 9.3359374 l -2.8320313,-1e-7 V 8.457031 7.5781248 h 2.8320313 v -2.34375 l 4.0527336,3.2226563 z\"\n       style=\"stroke-width:2.66873717\" />\n  </g>\n</svg>\n";

/***/ }),

/***/ "./style/icons/pull.svg":
/*!******************************!*\
  !*** ./style/icons/pull.svg ***!
  \******************************/
/***/ ((module) => {

module.exports = "<svg width=\"16\" viewBox=\"0 0 18 18\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path class=\"jp-icon3\" \n    d=\"M14.5125 7.53C14.0025 4.9425 11.73 3 9 3C6.8325 3 4.95 4.23 4.0125 6.03C1.755 6.27 0 8.1825 0 10.5C0 12.9825 2.0175 15 4.5 15H14.25C16.32 15 18 13.32 18 11.25C18 9.27 16.4625 7.665 14.5125 7.53ZM14.25 13.5H4.5C2.8425 13.5 1.5 12.1575 1.5 10.5C1.5 8.9625 2.6475 7.68 4.17 7.5225L4.9725 7.44L5.3475 6.7275C6.06 5.355 7.455 4.5 9 4.5C10.965 4.5 12.66 5.895 13.0425 7.8225L13.2675 8.9475L14.415 9.03C15.585 9.105 16.5 10.0875 16.5 11.25C16.5 12.4875 15.4875 13.5 14.25 13.5ZM10.0875 7.5H7.9125V9.75H6L9 12.75L12 9.75H10.0875V7.5Z\" \n    fill=\"#4F4F4F\"/>\n</svg>\n";

/***/ }),

/***/ "./style/icons/push.svg":
/*!******************************!*\
  !*** ./style/icons/push.svg ***!
  \******************************/
/***/ ((module) => {

module.exports = "<svg width=\"16\" viewBox=\"0 0 18 18\" xmlns=\"http://www.w3.org/2000/svg\">\n<path class=\"jp-icon3\" d=\"M14.5125 7.53C14.0025 4.9425 11.73 3 9 3C6.8325 3 4.95 4.23 4.0125 6.03C1.755 6.27 0 8.1825 0 10.5C0 12.9825 2.0175 15 4.5 15H14.25C16.32 15 18 13.32 18 11.25C18 9.27 16.4625 7.665 14.5125 7.53ZM14.25 13.5H4.5C2.8425 13.5 1.5 12.1575 1.5 10.5C1.5 8.9625 2.6475 7.68 4.17 7.5225L4.9725 7.44L5.3475 6.7275C6.06 5.355 7.455 4.5 9 4.5C10.965 4.5 12.66 5.895 13.0425 7.8225L13.2675 8.9475L14.415 9.03C15.585 9.105 16.5 10.0875 16.5 11.25C16.5 12.4875 15.4875 13.5 14.25 13.5ZM6 9.75H7.9125V12H10.0875V9.75H12L9 6.75L6 9.75Z\" fill=\"#4F4F4F\"/>\n</svg>\n";

/***/ }),

/***/ "./style/icons/remove.svg":
/*!********************************!*\
  !*** ./style/icons/remove.svg ***!
  \********************************/
/***/ ((module) => {

module.exports = "<svg\n   xmlns=\"http://www.w3.org/2000/svg\"\n   width=\"16\"\n   viewBox=\"0 0 24 24\"\n   version=\"1.1\">\n  <g class=\"jp-icon3 jp-icon-selectable\" stroke=\"#4F4F4F\" stroke-width=\"2px\">\n  <path\n     fill=\"none\"\n     d=\"M 2,12 H 22\" />\n   </g>\n</svg>\n";

/***/ }),

/***/ "./style/icons/rewind.svg":
/*!********************************!*\
  !*** ./style/icons/rewind.svg ***!
  \********************************/
/***/ ((module) => {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" viewBox=\"0 0 24 24\">\n    <path class=\"jp-icon3\" fill=\"#4F4F4F\" d=\"M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z\"/>\n</svg>\n";

/***/ }),

/***/ "./style/icons/select-for-compare.svg":
/*!********************************************!*\
  !*** ./style/icons/select-for-compare.svg ***!
  \********************************************/
/***/ ((module) => {

module.exports = "<svg width=\"16\" viewBox=\"0 0 15 15\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n  <g class=\"jp-icon3 jp-icon-selectable\" fill=\"#4F4F4F\">\n    <path d=\"M9.5 1H3.5C2.675 1 2.0075 1.63 2.0075 2.4L2 13.6C2 14.37 2.6675 15 3.4925 15H12.5C13.325 15 14 14.37 14 13.6V5.2L9.5 1ZM3.5 13.6V2.4H8.75L12.5 5.9V13.6H3.5Z\" />\n    <path d=\"M5,8 L5,9 L7,9 L7,11 L11,8 L7,5 L7,7 L5,7 z\" />\n  </g>\n</svg>";

/***/ }),

/***/ "./style/icons/tag.svg":
/*!*****************************!*\
  !*** ./style/icons/tag.svg ***!
  \*****************************/
/***/ ((module) => {

module.exports = "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\" viewBox=\"0 0 512.001 512.001\" width=\"16\">\n\t<path class=\"jp-icon3\" fill=\"#4F4F4F\" d=\"M506.513,311.066L253.87,58.423c-2.024-2.026-4.486-3.559-7.195-4.483L140.15,17.593\n\t\t\tc-6.758-2.305-14.242-0.568-19.294,4.483L84.709,58.222L31.977,5.491c-7.314-7.315-19.176-7.315-26.49,0\n\t\t\tc-7.315,7.315-7.315,19.175,0,26.49l52.732,52.731l-36.14,36.141c-5.051,5.05-6.79,12.534-4.483,19.294L53.943,246.67\n\t\t\tc0.924,2.71,2.458,5.172,4.483,7.197L311.071,506.51c7.314,7.315,19.175,7.315,26.49,0l168.954-168.954\n\t\t\tC513.83,330.241,513.83,318.382,506.513,311.066z M227.241,227.238c-21.817,21.819-57.132,21.82-78.952,0\n\t\t\tc-21.768-21.768-21.768-57.185,0.001-78.953c21.817-21.819,57.132-21.82,78.953,0C249.009,170.053,249.009,205.47,227.241,227.238\n\t\t\tz\"/>\n</svg>\n";

/***/ }),

/***/ "./style/icons/trash.svg":
/*!*******************************!*\
  !*** ./style/icons/trash.svg ***!
  \*******************************/
/***/ ((module) => {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" viewBox=\"0 0 24 24\">\n    <path class=\"jp-icon3\" fill=\"#4F4F4F\" d=\"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z\"/>\n    <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n</svg>\n";

/***/ }),

/***/ "./style/icons/vertical-more.svg":
/*!***************************************!*\
  !*** ./style/icons/vertical-more.svg ***!
  \***************************************/
/***/ ((module) => {

module.exports = "<svg width=\"16\" height=\"16\" version=\"1.1\" viewBox=\"0 0 6.35 6.35\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path class=\"jp-icon3\" transform=\"scale(.26458)\"\n    d=\"m11.939 1.7676a2.1655 2.1655 0 0 0-2.1055 2.1641 2.1655 2.1655 0 0 0 2.166 2.166 2.1655 2.1655 0 0 0 2.166-2.166 2.1655 2.1655 0 0 0-2.166-2.1641 2.1655 2.1655 0 0 0-0.060547 0zm0.060547 7.6172a2.1655 2.1655 0 0 0-2.166 2.166 2.1655 2.1655 0 0 0 2.166 2.166 2.1655 2.1655 0 0 0 2.166-2.166 2.1655 2.1655 0 0 0-2.166-2.166zm0 7.6191a2.1655 2.1655 0 0 0-2.166 2.166 2.1655 2.1655 0 0 0 2.166 2.166 2.1655 2.1655 0 0 0 2.166-2.166 2.1655 2.1655 0 0 0-2.166-2.166z\"\n    fill=\"#4F4F4F\" />\n</svg>";

/***/ })

}]);
//# sourceMappingURL=lib_index_js-webpack_sharing_consume_default_codemirror_language-webpack_sharing_consume_defa-fc4736.685bceb56b852e5d8ee3.js.map