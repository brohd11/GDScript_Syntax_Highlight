@tool
extends Node

@export var button:Button
@export_file("*.gd") var some_file:String
var root_node: Control # some comment

"""
some
multiline
comment
"""

var dialog: ConfirmationDialog
signal dialog_handled(status)
signal emitted

func _init(dialog_text: String, selected_node) -> void:
	root_node = selected_node
	_create_dialog(dialog_text)

func _create_dialog(dialog_text):
	for i:int in range(10):
		var dialog = ConfirmationDialog.new()
		dialog.confirmed.connect(_on_confirmed)
		dialog.canceled.connect(_on_canceled)
		print("Dialog created.")

func _on_confirmed():
	self.dialog_handled.emit(true)
	dialog.queue_free()

func _on_canceled():
	self.dialog_handled.emit(false)
	dialog.queue_free()
