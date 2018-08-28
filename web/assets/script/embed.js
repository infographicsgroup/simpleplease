document.write([
'<style type="text/css">',
'	#my_group {',
'		display: flex;',
'		text-align: center;',
'		justify-content: center;',
'	}',
'		#my_group button {',
'			background: transparent;',
'			border: 1px solid #343a40;',
'			color: #343a40;',
'			font-size: 16px;',
'			padding: 6px 12px;',
'			transition: color 0.15s, background-color 0.15s;',
'			line-height: 24px;',
'			display: block;',
'			margin-left: -1px;',
'		}',
'			#my_group button:first-child {',
'				border-top-left-radius: 4px;',
'				border-bottom-left-radius: 4px;',
'				margin-left: 0px;',
'			}',
'			#my_group button:last-child {',
'				border-top-right-radius: 4px;',
'				border-bottom-right-radius: 4px;',
'			}',
'			#my_group button.active, #my_group button:hover {',
'				background: #343a40;',
'				color: #fff;',
'			}',
'	.language {',
'		display: hidden;',
'	}',
'	h2.language {',
'		text-align: center;',
'	}',
'	#my_editor_wrapper {',
'		background: #fff;',
'		border-radius: 4px;',
'		box-shadow: 0px 5px 15px rgba(0,0,0,0.15);',
'		padding: 35px;',
'	}',
'	#my_editor {',
'		-webkit-appearance:none;',
'		background: transparent;',
'		border: none;',
'		font-family: monospace;',
'		font-size: 14px;',
'		font-weight: normal;',
'		letter-spacing: normal;',
'		line-height: 1.6em;',
'		margin: 0px;',
'		padding: 0px;',
'		resize: none;',
'	}',
'	.ql-editor {',
'		-webkit-appearance:none;',
'		border: none;',
'		outline: none;',
'	}',
'	.ql-clipboard {',
'		left: -100000px;',
'		height: 1px;',
'		overflow-y: hidden;',
'		position: absolute;',
'		top: 50%;',
'	}',
'</style>',
'<div id="my_group">',
'	<button type="button" name="language" value="english" autocomplete="off" class="active">english</button>',
'	<button type="button" name="language" value="german"  autocomplete="off">german</button>',
'</div>',
'<h2 class="language german">Füge deinen Text ein. Komplizierte Wörter werden hervorgehoben.</h2>',
'<h2 class="language english">Enter or paste any text. Uncommon words will be highlighted.</h2>',
'<div id="my_editor_wrapper">',
'	<div id="my_editor"></div>',
'</div>',
'<script type="text/javascript" src="assets/quill/quill.min.js"></script>',
'<script type="text/javascript" src="assets/script/stemmer.js"></script>',
'<script type="text/javascript" src="assets/script/main.js"></script>',
'<script type="text/javascript">',
'	$(function () {',
'		textAnalysis({',
'			editor:"#my_editor",',
'		});',
'	})',
'</script>'
].join('\n'));