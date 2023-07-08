import os
import zipfile

def zip_files_with_extensions(start_dir, exts, zip_name, include_dirs):
    with zipfile.ZipFile(zip_name, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(start_dir):
            # Include only directories in include_dirs
            dirs[:] = [d for d in dirs if d in include_dirs]
            for file in files:
                if any(file.endswith(ext) for ext in exts):
                    zipf.write(os.path.join(root, file))

# ディレクトリ、拡張子リスト、zipファイル名を指定します
start_dir = '.'
exts = ['.rs', '.vue', '.css', '.html']  # 拡張子をリストで指定します
# 現在のディレクトリ名を取得
current_dir = os.path.basename(os.getcwd())
zip_name = f'{current_dir}.zip'  # 作成するzipファイルの名前を指定します
include_dirs = ['src', 'src-tauri']  # 圧縮対象のディレクトリのリストを指定します

zip_files_with_extensions(start_dir, exts, zip_name, include_dirs)