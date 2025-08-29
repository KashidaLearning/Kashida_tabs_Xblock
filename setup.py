import os
from setuptools import setup, find_packages

setup(
    name='tabs_xblock',
    version='0.1',
    description='Kashida Vertical Tabs XBlock',
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        'XBlock',
    ],
    entry_points={
        'xblock.v1': [
            'kashida_tabs_xblock = tabs_xblock.tabs_xblock:TabsXBlock'
        ]
    },
   package_data={
    'tabs_xblock': [
        'static/public/tinymce/**/*.*',
        'static/public/css/*.css',
        'static/public/js/*.js',
        'templates/*.html',
    ]
},



    zip_safe=False,
)
