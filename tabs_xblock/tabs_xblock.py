import pkg_resources
import re
from xblock.core import XBlock
from xblock.fragment import Fragment
from xblock.fields import Integer, String, List, Scope
from django.conf import settings
from xblock.utils.studio_editable import loader
from xblock.fields import Boolean


def safe_uid(uid):
    return re.sub(r'[^a-zA-Z0-9_]', '_', uid)


class TabsXBlock(XBlock):
    icon_width = String(default="48px", scope=Scope.settings)
    icon_height = String(default="48px", scope=Scope.settings)
    intro_font_color = String(default="#000000", scope=Scope.settings)
    intro_font_size = Integer(default=16, scope=Scope.settings)
    intro_padding_left = String(default="0px", scope=Scope.settings)

    display_name = String(default="Kashida Tabs XBlock", scope=Scope.settings)
    icon_image_url = String(default="https://learnsimply.kashida-learning.com/asset-v1:LFJL+108+2025+type@asset+block@Frame_356__3_.png", scope=Scope.settings)
    intro_text = String(default="Click on the buttons below to know more", scope=Scope.settings)
    tab_count = Integer(default=3, scope=Scope.settings)
    background_color = String(default="#fff8f3", scope=Scope.settings)

    tab_font_size = Integer(default=16, scope=Scope.settings)
    tab_font_color = String(default="#ffffff", scope=Scope.settings)
    tab_padding = String(default="30px 30px 18px 30px", scope=Scope.settings)
    instruction_padding = String(default="10px 15px", scope=Scope.settings)
    mainbox_padding = String(default="20px 0px", scope=Scope.settings)
    tablink_padding = String(default="10px 18px", scope=Scope.settings) 
    tab_button_width = String(default="195px", scope=Scope.settings)

    tab_button_padding_top = String(default="", scope=Scope.settings)
    tab_button_padding_right = String(default="", scope=Scope.settings)
    tab_button_padding_bottom = String(default="", scope=Scope.settings)
    tab_button_padding_left = String(default="", scope=Scope.settings)
    tab_gap = String(default="11px", scope=Scope.settings)

    orientation = String(default="vertical", scope=Scope.settings)
    text_direction = String(default="ltr", scope=Scope.settings)
    predefined_style = String(default="default", scope=Scope.settings)

    tab_bg_color = String(default="#2039b8", scope=Scope.settings)
    tab_border_color = String(default="#23928b", scope=Scope.settings)
    tab_border_width = String(default="0px", scope=Scope.settings)
    tab_border_style = String(default="solid", scope=Scope.settings)
    tab_border_radius = String(default="0px", scope=Scope.settings)

    active_tab_color = String(default="#d3dee7", scope=Scope.settings)
    active_tab_font_color = String(default="#2140b7", scope=Scope.settings)
    active_tab_no_border = Boolean(default=False, scope=Scope.settings)
    active_tab_border_style = String(default="solid", scope=Scope.settings) 
    underline_color = String(default="#23928b", scope=Scope.settings)

    tabs_content = List(default=[
        {
            "id": "first",
            "title": "Title One",
            "content": """<h4>Title One</h4>
<p>This course aims to provide foundational knowledge and resources about the Libyan conflict and human rights situation, tailored for international professionals interested and/or working in the human rights field. It equips them with the knowledge necessary to navigate Libya's evolving political, socio-economic, and human rights landscape to support them as they embark on their work in Libya.</p>
<img src="https://learnsimply.kashida-learning.com/asset-v1:LFJL+108+2025+type@asset+block@Frame_535__2_.png"/>"""
        },
        {
            "id": "second",
            "title": "Title Two",
            "content": """<h4>Title Two</h4>
<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,</p>
<img src="https://learnsimply.kashida-learning.com/asset-v1:LFJL+108+2025+type@asset+block@Frame_535__2_.png"/>"""
        },
        {
            "id": "third",
            "title": "Title Three",
            "content": """<h4>Title Three</h4>
<p>This handy tool helps you create dummy text for all your layout needs. We are gradually adding new functionality and we welcome your suggestions and feedback. Please feel free to send us any additional dummy texts.</p>
<img src="https://learnsimply.kashida-learning.com/asset-v1:LFJL+108+2025+type@asset+block@Frame_535__2_.png"/>"""
        }
    ], scope=Scope.content)

    def resource_string(self, path):
        return pkg_resources.resource_string(__name__, path).decode('utf8')

    def studio_view(self, context=None):
        raw_uid = str(self.scope_ids.usage_id)
        safe = safe_uid(raw_uid)

        html = self.resource_string('templates/studio_view.html')
        frag = Fragment(html.format(
            uid=safe,
            display_name=self.display_name,
            tab_count=self.tab_count,
            icon_image_url=self.icon_image_url,
            intro_text=self.intro_text,

            background_color=self.background_color,
            tab_font_size=self.tab_font_size,
            tab_font_color=self.tab_font_color,
            tab_padding=self.tab_padding,
            instruction_padding=self.instruction_padding,
            mainbox_padding=self.mainbox_padding,
            tablink_padding=self.tablink_padding,

            orientation=self.orientation,
            vertical_selected="selected" if self.orientation == "vertical" else "",
            horizontal_selected="selected" if self.orientation == "horizontal" else "",
            tab_button_width=self.tab_button_width,

            tabs_content=getattr(self, "tabs_content", []),

            text_direction=self.text_direction,
            ltr_selected="selected" if self.text_direction == "ltr" else "",
            rtl_selected="selected" if self.text_direction == "rtl" else "",

            icon_width=self.icon_width,
            icon_height=self.icon_height,
            intro_font_color=self.intro_font_color,
            intro_font_size=self.intro_font_size,
            intro_padding_left=self.intro_padding_left,

            predefined_style=self.predefined_style,
            predefined_style_default_selected="selected" if self.predefined_style == "default" else "",
            predefined_style_vertical_1_selected="selected" if self.predefined_style == "vertical-1" else "",
            predefined_style_vertical_2_selected="selected" if self.predefined_style == "vertical-2" else "",
            predefined_style_horizontal_1_selected="selected" if self.predefined_style == "horizontal-1" else "",
            predefined_style_horizontal_2_selected="selected" if self.predefined_style == "horizontal-2" else "",

            tab_bg_color=self.tab_bg_color,
            tab_border_color=self.tab_border_color,
            tab_border_width=self.tab_border_width,
            tab_border_style=self.tab_border_style,
            tab_border_radius=self.tab_border_radius,
            tab_border_style_solid_selected="selected" if self.tab_border_style == "solid" else "",
            tab_border_style_dashed_selected="selected" if self.tab_border_style == "dashed" else "",
            tab_border_style_dotted_selected="selected" if self.tab_border_style == "dotted" else "",

            active_tab_color=self.active_tab_color,
            active_tab_font_color=self.active_tab_font_color,
            active_tab_no_border_checked="checked" if self.active_tab_no_border == "true" else "",
            active_tab_border_style_solid_selected="selected" if self.active_tab_border_style == "solid" else "",
            active_tab_border_style_underline_selected="selected" if self.active_tab_border_style == "underline" else "",
            underline_color=self.underline_color,

            tab_button_padding_top=self.tab_button_padding_top,
            tab_button_padding_right=self.tab_button_padding_right,
            tab_button_padding_bottom=self.tab_button_padding_bottom,
            tab_button_padding_left=self.tab_button_padding_left,
            tab_gap=self.tab_gap,
        ))

        frag.add_css(self.resource_string('static/public/css/tabs_xblock.css'))
        frag.add_javascript(self.resource_string('static/public/js/tabs_xblock.js'))
        frag.add_javascript_url(settings.STATIC_URL + 'js/vendor/tinymce/js/tinymce/themes/silver/theme.min.js')

        # Build the payload with your XBlock fields
        payload = {
            'tabs_content': self.tabs_content,
            'xblock_uid': safe,

            'icon_image_url': self.icon_image_url,
            'intro_text': self.intro_text,

            'background_color': self.background_color,
            'tab_font_size': self.tab_font_size,
            'tab_font_color': self.tab_font_color,
            'tab_padding': self.tab_padding,
            'instruction_padding': self.instruction_padding,
            'mainbox_padding': self.mainbox_padding,
            'tablink_padding': self.tablink_padding,

            'orientation': self.orientation,
            'tab_button_width': self.tab_button_width,
            'text_direction': self.text_direction,

            'icon_width': self.icon_width,
            'icon_height': self.icon_height,
            'intro_font_color': self.intro_font_color,
            'intro_font_size': self.intro_font_size,
            'intro_padding_left': self.intro_padding_left,

            'predefined_style': self.predefined_style,

            'tab_bg_color': self.tab_bg_color,
            'tab_border_color': self.tab_border_color,
            'tab_border_width': self.tab_border_width,
            'tab_border_style': self.tab_border_style,
            'tab_border_radius': self.tab_border_radius,

            'active_tab_color': self.active_tab_color,
            'active_tab_font_color': self.active_tab_font_color,
            'active_tab_no_border': self.active_tab_no_border,
            'active_tab_border_style': self.active_tab_border_style,
            'underline_color': self.underline_color,

            'tab_button_padding_top': self.tab_button_padding_top,
            'tab_button_padding_right': self.tab_button_padding_right,
            'tab_button_padding_bottom': self.tab_button_padding_bottom,
            'tab_button_padding_left': self.tab_button_padding_left,
            'tab_gap': self.tab_gap,
        }

        js_data = {
            'editor': getattr(self, "editor", "visual"),
            'script_url': settings.STATIC_URL + 'js/vendor/tinymce/js/tinymce/tinymce.full.min.js',
            'skin_url': settings.STATIC_URL + 'js/vendor/tinymce/js/tinymce/skins/ui/studio-tmce5',
            'content_css': [settings.STATIC_URL + 'js/vendor/tinymce/js/tinymce/skins/content/default/content.min.css'],
            'icons_url': settings.STATIC_URL + 'js/vendor/tinymce/js/tinymce/icons/default/icons.min.js',
            'external_plugins': {
                plugin: settings.STATIC_URL + f"js/vendor/tinymce/js/tinymce/plugins/{plugin}/plugin.min.js"
                for plugin in ['codesample', 'image', 'link', 'lists', 'table']
            },
            'table_custom_classes': []
        }




        payload.update(js_data)

        frag.initialize_js('initTabsXBlockStudio', payload)
        return frag


    def add_edit_stylesheets(self, frag):
        """
        A helper method to add all styles to the fragment necesesary for edit.
        :param frag: The fragment that will hold the scripts.
        """
        frag.add_css(self.resource_string('static/css/html_edit.css'))

        if self.editor == 'raw':
            frag.add_css_url(settings.STATIC_URL + 'js/vendor/CodeMirror/codemirror.css')

    def add_edit_scripts(self, frag):
        """
        A helper method to add all scripts to the fragment necessary for edit.
        :param frag: The fragment that will hold the scripts.
        """
        frag.add_javascript_url(settings.STATIC_URL + 'js/vendor/tinymce/js/tinymce/tinymce.full.min.js')
        frag.add_javascript_url(settings.STATIC_URL + 'js/vendor/tinymce/js/tinymce/themes/silver/theme.min.js')
        frag.add_javascript(self.resource_string('static/js/html_edit.js'))
        frag.add_javascript(loader.load_unicode('public/studio_edit.js'))

        if self.editor == 'raw':
            frag.add_javascript_url(settings.STATIC_URL + 'js/vendor/CodeMirror/codemirror.js')
            frag.add_javascript_url(settings.STATIC_URL + 'js/vendor/CodeMirror/addons/xml.js')

    @staticmethod
    def get_editor_plugins():
        """
        This method will generate a list of external plugins urls to be used in TinyMCE editor.
        These plugins should live in `public` directory for us to generate URLs for.

        :return: A list of URLs
        """
        plugin_path = 'plugins/{plugin}/plugin.min.js'
        plugins = ['codesample', 'image', 'link', 'lists', 'codemirror', 'table']

        return {
            plugin: (
                settings.STATIC_URL + "js/vendor/tinymce/js/tinymce/" +
                plugin_path.format(plugin=plugin)
            ) for plugin in plugins
        }

    def student_view(self, context=None):
        raw_uid = str(self.scope_ids.usage_id)
        safe = safe_uid(raw_uid)

        direction_attr = f'dir="{self.text_direction}"' if self.text_direction else ""
        rtl_class = "rtl" if self.text_direction == "rtl" else ""

        tab_bg_color = getattr(self, "tab_bg_color", "#2039b8")
        tab_font_color = getattr(self, "tab_font_color", "#ffffff")
        tab_border_color = getattr(self, "tab_border_color", "#23928b")
        tab_border_width = getattr(self, "tab_border_width", "0px")
        tab_border_style = getattr(self, "tab_border_style", "solid")
        tab_border_radius = getattr(self, "tab_border_radius", "0px")

        active_tab_color = getattr(self, "active_tab_color", "#d3dee7")
        active_tab_font_color = getattr(self, "active_tab_font_color", "#2140b7")
        active_tab_no_border = getattr(self, "active_tab_no_border", "false")
        active_tab_border_style = getattr(self, "active_tab_border_style", "solid")
        underline_color = getattr(self, "underline_color", "#23928b")

        pt = getattr(self, "tab_button_padding_top", "") or ""
        pr = getattr(self, "tab_button_padding_right", "") or ""
        pb = getattr(self, "tab_button_padding_bottom", "") or ""
        pl = getattr(self, "tab_button_padding_left", "") or ""
        if any([pt, pr, pb, pl]):
            tablink_padding = f"{pt or '0'} {pr or '0'} {pb or '0'} {pl or '0'}"
        else:
            tablink_padding = getattr(self, "tablink_padding", "10px 18px")

        tab_gap = getattr(self, "tab_gap", "11px")

        tabss_class = f"tabss {self.orientation}"
        if self.predefined_style == "vertical-1":
            tabss_class += " style-1"
        if self.predefined_style == "vertical-2":
            tabss_class += " style-2"
        if self.predefined_style == "horizontal-1":
            tabss_class += " hstyle-1"
        if self.predefined_style == "horizontal-2":
            tabss_class += " hstyle-2"
        if active_tab_border_style == "underline":
            tabss_class += " underline-active"

        underline_style = f'--underline-color: {underline_color};' if active_tab_border_style == "underline" else ''

        html = f"""
<div class="box {rtl_class}" id="box-{safe}" data-xblock-uid="{safe}" {direction_attr}
    data-tab-bg-color="{tab_bg_color}" 
    data-tab-font-color="{tab_font_color}"
    data-active-tab-color="{active_tab_color}"
    data-active-tab-font-color="{active_tab_font_color}"
    data-tab-border-width="{tab_border_width}"
    data-tab-border-style="{tab_border_style}"
    data-tab-border-color="{tab_border_color}"
    data-tab-border-radius="{tab_border_radius}"
    data-active-tab-no-border="{active_tab_no_border}"
    data-bg-color="{self.background_color}"
    style="background:{self.background_color};">
    <div class="instruction" style="padding:{self.instruction_padding};">
        <div class="insticon">
            <img src="{self.icon_image_url}" style="width:{self.icon_width};height:{self.icon_height};object-fit:contain;border-radius:9px;"/>
        </div>
        <div class="insttext" style="color:{self.intro_font_color};font-size:{self.intro_font_size}px;padding-left:{self.intro_padding_left};font-weight:500;">
            {self.intro_text}
        </div>
    </div>
    <br>
    <div class="mainbox" style="padding:{self.mainbox_padding};display:flex;gap:0px;">
        <div class="{tabss_class}" style="padding:{self.tab_padding};gap:{tab_gap};{underline_style}">
"""

        is_style2 = (self.predefined_style == "vertical-2")      
        is_hstyle1 = (self.predefined_style == "horizontal-1")
        is_hstyle2 = (self.predefined_style == "horizontal-2")
        is_underline_mode = (active_tab_border_style == "underline")            # ★ CHANGED

        for idx, tab in enumerate(self.tabs_content):
            is_active = (idx == 0)
            is_underline = is_underline_mode

            btn_font_color = active_tab_font_color if is_active else tab_font_color
            btn_bg = "transparent" if is_underline else (active_tab_color if is_active else tab_bg_color)

            if is_underline or is_style2  or is_hstyle1 or  is_hstyle2:                                       # ★ CHANGED
                btn_border = "none"
            else:
                btn_border = f"{tab_border_width} {tab_border_style} {tab_border_color}"
                if is_active and active_tab_no_border == "true":
                    btn_border = "none"

            btn_style = f"""
                background:{btn_bg};
                color:{btn_font_color};
                font-size:{self.tab_font_size}px;
                padding:{tablink_padding};
                width:{self.tab_button_width};
                {'' if (is_style2 or is_underline_mode or is_hstyle1 or  is_hstyle2) else f'border:{btn_border};'}
            """.replace('\\n','').replace('  ',' ')
            html += f'<button class="tablinks {"active" if is_active else ""}" onclick="openTab(event, \'{tab["id"]}-{safe}\')" style="{btn_style}">{tab["title"]}</button>'

        html += '<p style="margin:0px;"><br></p></div>'

        for idx, tab in enumerate(self.tabs_content):
            display_panel = 'block' if idx == 0 else 'none'
            html += f'<div id="{tab["id"]}-{safe}" class="tabcontent" style="display:{display_panel};">{tab["content"]}</div>'

        html += '</div></div>'

        frag = Fragment(html)
        frag.add_css(self.resource_string('static/public/css/tabs_xblock.css'))
        frag.add_javascript(self.resource_string('static/public/js/tabs_xblock_lms.js'))
        frag.add_css(self.resource_string('public/plugins/codesample/css/prism.css'))
        frag.add_javascript(self.resource_string('public/plugins/codesample/js/prism.js'))

        return frag

    @XBlock.json_handler
    def save_settings(self, data, suffix=''):
        """
        Save settings sent from Studio form.
        """

        # Helper to avoid ValueError on empty strings
        def safe_int(value, default):
            try:
                return int(value)
            except (ValueError, TypeError):
                return default

        # Strings (copy your own list; these are examples)
        self.background_color   = data.get("background_color",   self.background_color)
        self.tab_font_color     = data.get("tab_font_color",     self.tab_font_color)
        self.icon_image_url     = data.get("icon_image_url",     self.icon_image_url)
        self.intro_text         = data.get("intro_text",         self.intro_text)
        self.tab_padding        = data.get("tab_padding",        self.tab_padding)
        self.instruction_padding= data.get("instruction_padding",self.instruction_padding)
        self.mainbox_padding    = data.get("mainbox_padding",    self.mainbox_padding)
        self.tablink_padding    = data.get("tablink_padding",    self.tablink_padding)
        self.orientation        = data.get("orientation",        self.orientation)
        self.tab_button_width   = data.get("tab_button_width",   self.tab_button_width)
        self.text_direction     = data.get("text_direction",     self.text_direction)
        self.tab_bg_color       = data.get("tab_bg_color",       self.tab_bg_color)
        self.tab_border_color   = data.get("tab_border_color",   self.tab_border_color)
        self.tab_border_width   = data.get("tab_border_width",   self.tab_border_width)
        self.tab_border_style   = data.get("tab_border_style",   self.tab_border_style)
        self.tab_border_radius  = data.get("tab_border_radius",  self.tab_border_radius)
        self.active_tab_color   = data.get("active_tab_color",   self.active_tab_color)
        self.active_tab_font_color = data.get("active_tab_font_color", self.active_tab_font_color)
        self.active_tab_border_style = data.get("active_tab_border_style", self.active_tab_border_style)
        self.underline_color    = data.get("underline_color",    self.underline_color)
        self.icon_width         = data.get("icon_width",         self.icon_width)
        self.icon_height        = data.get("icon_height",        self.icon_height)
        self.tab_gap            = data.get("tab_gap",            self.tab_gap)
        self.intro_font_color   = data.get("intro_font_color",   self.intro_font_color)
        self.intro_padding_left = data.get("intro_padding_left", self.intro_padding_left)
        self.predefined_style   = data.get("predefined_style",   self.predefined_style)

        # Integers (safe)
        self.tab_font_size   = safe_int(data.get("tab_font_size"),   getattr(self, "tab_font_size", 16))
        self.intro_font_size = safe_int(data.get("intro_font_size"), getattr(self, "intro_font_size", 16))

        # Boolean (checkbox)
        self.active_tab_no_border = bool(data.get("active_tab_no_border", False))

        return {"result": "success"}


    @XBlock.json_handler
    def save_content(self, data, suffix=''):
        """
        Save tab titles and contents, and also persist tab_count.
        """
        incoming = data.get("tabs", self.tabs_content)
        cleaned = []
        for i, t in enumerate(incoming):
            cleaned.append({
                "id": t.get("id") or f"tab{i}",
                "title": t.get("title", f"Tab {i+1}"),
                "content": t.get("content", "")
            })

        # Persist tabs
        self.tabs_content = cleaned
        # 🔑 Persist count
        self.tab_count = len(cleaned)

        return {"result": "success", "count": self.tab_count}

