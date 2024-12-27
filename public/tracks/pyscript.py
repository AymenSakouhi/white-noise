import os

import requests


def download_files(url_file, download_path):
    """
    Reads a text file containing URLs (one per line) and downloads each file to the specified directory.

    Args:
        url_file (str): Path to the text file containing URLs.
        download_path (str): Path to the directory where files will be downloaded.

    Returns:
        None
    """
    # Ensure the download path exists
    os.makedirs(download_path, exist_ok=True)

    try:
        with open(url_file, "r") as file:
            urls = file.readlines()

        for url in urls:
            url = url.strip()
            if not url:
                continue

            try:
                response = requests.get(url, stream=True)
                response.raise_for_status()  # Raise an error for HTTP errors

                # Extract file name from the URL
                file_name = os.path.basename(url)
                file_path = os.path.join(download_path, file_name)

                # Write the content to a file
                with open(file_path, "wb") as f:
                    for chunk in response.iter_content(chunk_size=8192):
                        f.write(chunk)

                print(f"Downloaded: {file_name}")
            except requests.exceptions.RequestException as e:
                print(f"Failed to download {url}: {e}")
    except FileNotFoundError:
        print(f"The file {url_file} was not found.")
    except Exception as e:
        print(f"An error occurred: {e}")


if __name__ == "__main__":
    # Specify the path to the text file containing URLs
    url_file = "media_urls.txt"  # Replace with your text file path

    # Specify the directory where files will be downloaded
    download_path = "downloads"  # Replace with your desired path

    # Start downloading files
    download_files(url_file, download_path)
