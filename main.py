import subprocess

def get_wifi_passwords():
    # Run the command to get a list of Wi-Fi profiles
    profiles_data = subprocess.check_output(['netsh', 'wlan', 'show', 'profiles']).decode('utf-8', errors='ignore')
    
    # Find all Wi-Fi profiles
    profiles = [line.split(":")[1].strip() for line in profiles_data.split('\n') if "All User Profile" in line]

    wifi_passwords = []

    # Loop through all profiles and extract the passwords
    for profile in profiles:
        # Run the command to get the password for the profile
        profile_info = subprocess.check_output(['netsh', 'wlan', 'show', 'profile', profile, 'key=clear']).decode('utf-8', errors='ignore')
        
        # Look for the password in the output
        password_line = [line for line in profile_info.split('\n') if "Key Content" in line]
        
        # If the password exists, add it to the list
        if password_line:
            password = password_line[0].split(":")[1].strip()
        else:
            password = None
        
        wifi_passwords.append({'SSID': profile, 'Password': password})

    return wifi_passwords

if __name__ == "__main__":
    passwords = get_wifi_passwords()
    for wifi in passwords:
        print(f"SSID: {wifi['SSID']}, Password: {wifi['Password']}")
import subprocess

def get_wifi_passwords():
    # Run the command to get a list of Wi-Fi profiles
    profiles_data = subprocess.check_output(['netsh', 'wlan', 'show', 'profiles']).decode('utf-8', errors='ignore')
    
    # Find all Wi-Fi profiles
    profiles = [line.split(":")[1].strip() for line in profiles_data.split('\n') if "All User Profile" in line]

    wifi_passwords = []

    # Loop through all profiles and extract the passwords
    for profile in profiles:
        # Run the command to get the password for the profile
        profile_info = subprocess.check_output(['netsh', 'wlan', 'show', 'profile', profile, 'key=clear']).decode('utf-8', errors='ignore')
        
        # Look for the password in the output
        password_line = [line for line in profile_info.split('\n') if "Key Content" in line]
        
        # If the password exists, add it to the list
        if password_line:
            password = password_line[0].split(":")[1].strip()
        else:
            password = None
        
        wifi_passwords.append({'SSID': profile, 'Password': password})

    return wifi_passwords

if __name__ == "__main__":
    passwords = get_wifi_passwords()
    for wifi in passwords:
        print(f"SSID: {wifi['SSID']}, Password: {wifi['Password']}")
