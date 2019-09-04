document.write([
'<style type="text/css">',
'	#my_group {',
'		display: flex;',
'		text-align: center;',
'		justify-content: center;',
'		margin: 1.5em 0;',
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
'		text-align:center;',
'	}',
'  .my_small { font-size: 0.75em; color: rgba(0,0,0,0.5) }',
'  .my_expl { display:inline-block; vertical-align:-0.25em; width:1em; height:1em; border: 1px solid rgba(0,0,0,0.1); margin: 0px; }',
'	h2.language {',
'		text-align: center;',
'	}',
'	#my_editor_wrapper {',
'		background: #fff;',
'		border-radius: 4px;',
'		box-shadow: 0px 5px 15px rgba(0,0,0,0.15);',
'		padding: 35px;',
'		margin-top: 30px;',
'		width: 100%;',
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
'		color:#000;',
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
'<p class="language german">Füge deinen Text ein. Komplizierte Wörter werden hervorgehoben.</p>',
'<p class="language german my_small">häufige Worte &nbsp; ',
	'<span class="my_expl" value="0"></span>',
	'<span class="my_expl" value="0.2"></span>',
	'<span class="my_expl" value="0.4"></span>',
	'<span class="my_expl" value="0.6"></span>',
	'<span class="my_expl" value="0.8"></span>',
	'<span class="my_expl" value="1"></span>',
' &nbsp; seltene Worte</p>',
'<p class="language english">Enter or paste any text. Uncommon words will be highlighted.</p>',
'<p class="language english my_small">common words &nbsp; ',
	'<span class="my_expl" value="0"></span>',
	'<span class="my_expl" value="0.2"></span>',
	'<span class="my_expl" value="0.4"></span>',
	'<span class="my_expl" value="0.6"></span>',
	'<span class="my_expl" value="0.8"></span>',
	'<span class="my_expl" value="1"></span>',
' &nbsp; uncommon words</p>',
'<div id="my_editor_wrapper">',
'	<div id="my_editor"></div>',
'</div>',
'<script type="text/javascript" src="//simpleplease.igg.solutions/assets/quill/quill.min.js"></script>',
'<script type="text/javascript" src="//simpleplease.igg.solutions/assets/script/stemmer.js"></script>',
'<script type="text/javascript" src="//simpleplease.igg.solutions/assets/script/main.js"></script>',
'<script type="text/javascript">',
'	window.addEventListener("load", function() {',
'		textAnalysis({editor:"#my_editor", url:"/simpleplease/"})',
'	});',
'</script>'
].join('\n'));
