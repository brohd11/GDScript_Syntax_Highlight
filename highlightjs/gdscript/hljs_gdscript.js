import GDKeywords from "./gd-keywords.js"
import UserTypes from "./user-types.js"

const builtInNamesArray = GDKeywords.builtInNames
const escapedBuiltInNames = builtInNamesArray
    .split(" ")
    .map(name => name.replace(/[-\/\\^$.*+?()[\]{}|]/g, '\\$&'))
    .join('|');

export function initHighlight(){
    hljs.registerLanguage(
        "gdscript", function() {
            "use strict";
            var e = e || {};
            
            function r(e) {
                return {
                    aliases: ["godot", "gdscript"],
                    keywords: {
                        keyword: GDKeywords.keywords,
                        control_flow_keyword: GDKeywords.controlFlowKeywords,
                        base_type: GDKeywords.baseTypes,
                        engine_type: GDKeywords.engineTypes,
                        user_type: UserTypes.userTypes
                        //function_definition: = GDKeywords.functionDefinitions
                    },
                    contains: [
                    e.NUMBER_MODE,
                    e.HASH_COMMENT_MODE,
                    {scope: "comment", begin: /"""/, end: /"""/ },
                    e.QUOTE_STRING_MODE,
                    {scope: "class", beginKeywords: "class" },
                    {scope: "symbol", begin:/[()\-:=>,\.]/},
                    { 
                        scope: "class_name", 
                        begin: /class_name\s+/,
                        end: /\s+/,
                        excludeBegin: true,
                        excludeEnd: true,
                        // endScope:"base_type",
                        // illegal: /\S/,
                    },
                    {
                        scope:"annotations", 
                        begin: /@[\w]+/,
                        end: /\s*\(|\s+/,
                        endScope:"symbol",
                    },
                    { 
                        scope: "function", 
                        beginKeywords: "func",
                        end: /\s*\(/,
                        endScope:"symbol",
                        illegal: /\S/,
                        contains: [e.UNDERSCORE_TITLE_MODE]
                    },
                    { 
                        scope: "signal", 
                        begin: /signal\s+/,
                        end: /\s*\(|$/,
                        excludeBegin: true,
                        endScope:"symbol",
                        excludeEnd: true,
                        illegal: /\S/,
                    },
                    {
                        scope: 'global_func',
                        begin: new RegExp(`\\b(${escapedBuiltInNames})\\b`),
                        end:/\s*\(|\s+/,
                        endScope:"symbol",
                        relevance: 2,
                    },
                    {
                        scope: "function_call",
                        begin: new RegExp(`(?!(${escapedBuiltInNames})\\b)([a-zA-Z_]\\w*)(?=\\()`),
                        end: /\(/,
                        endScope:"symbol",
                        relevance:1,
                    },
                    {
                        scope: "variable",
                        begin: /(?<=\.)\w+/,
                        illegal: /\(/,
                        relevance:0,
                    },
                    {
                        scope: "return_type",
                        begin: /\s*->\s*/,
                        beginScope: "symbol",
                        end: /\s*:\s*/,
                        endScope: "symbol",
                        relevance: 0, 
                    },
                    ],
                }
            } return e.exports = function(e) {
                e.registerLanguage("gdscript", r)
            },
            e.exports.definer = r,
            e.exports.definer || e.exports
        
        }()
    );
};

export function setClassHighlight(classStr){
    const codeElements = document.querySelectorAll(classStr);
    if (codeElements.length === 0) {
        return;
    }
    const gdElement = document.querySelector(".language-gdscript");
    if (gdElement){
        initHighlight();
    }
    codeElements.forEach(element => {
        hljs.highlightElement(element);
    });
};

document.addEventListener("DOMContentLoaded", highlight)
function highlight(){
    const gdElement = document.querySelector(".language-gdscript");
    if (gdElement){
        initHighlight();
    }
    hljs.highlightAll();
    document.removeEventListener("DOMContentLoaded", highlight);
}
