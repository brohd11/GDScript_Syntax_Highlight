# GDSCript Syntax Highlight

## Fork of DinDeprecated's fork. Updated for Godot 4.0, and can handle more of the syntax. 
Unsure of performance, a few more rules were added. Updated to Highlightjs 11, though some may still be outdated, I'm not that familiar with it!

### Usage
Used to highlight GDScript syntax on HTML.

Copy highlightjs folder and contents to root.

Include highlightjs remote files and local files in the head tags:

```html
<link rel="stylesheet" href="https://unpkg.com/@highlightjs/cdn-assets@11.9.0/styles/default.min.css">
<script src="https://unpkg.com/@highlightjs/cdn-assets@11.9.0/highlight.min.js"></script>

<link rel="stylesheet" href="/highlightjs/gdscript/gd-style.css">
<script type="module" src="/highlightjs/gdscript/hljs_gdscript.js"></script>
```
'gd-keywords.js' stores the keywords, should be up to date.
'hljs-gdscript.js' will run on 'DOMContentLoaded'.

---

### Example

![example](https://github.com/user-attachments/assets/02fdf676-f953-437f-ab39-db1560d618da)
