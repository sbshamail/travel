import { useState } from 'react';
import { T, V } from '../../@core/tag';
import { Button } from '../../@core/tag/Button';
import { Modal, Pressable } from 'react-native';
import { useTheme } from '@/@core/theme/themeContext';
import { Ionicons } from '@expo/vector-icons';
import { useAppNavigation } from '@/app/navigation/useAppNavigation';
const Nav = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { theme, toggleTheme } = useTheme(); // Assume you have theme context
  const navigation = useAppNavigation();
  return (
    <>
      <V className="w-full flex-row items-center justify-between bg-card px-6 py-4">
        <T className="text-lg font-bold">WeTravel</T>

        <Button variant="outline" onPress={() => setMenuVisible(true)}>
          My Ride
        </Button>
      </V>

      {/* Fullscreen Menu Modal */}
      <Modal visible={menuVisible} animationType="fade" transparent={false}>
        <V className="flex-1  ">
          <V className="m-10 flex-1 rounded-md border border-border bg-card p-10 shadow-xl shadow-border">
            {/* Close Button */}
            <V className="flex-row justify-end bg-transparent">
              <Pressable onPress={() => setMenuVisible(false)}>
                <Ionicons name="close" size={28} color="gray" />
              </Pressable>
            </V>

            <T className="mb-8 text-2xl font-bold">My Ride Options</T>

            <V className="gap-4 bg-transparent">
              <Button
                onPress={() => {
                  navigation.navigate('CreateRide');
                  setMenuVisible(false);
                }}>
                Create Ride
              </Button>

              <Button
                onPress={() => {
                  setMenuVisible(false);
                }}>
                My Ride List
              </Button>

              <Button
                onPress={() => {
                  setMenuVisible(false);
                }}>
                Account Settings
              </Button>

              <Button
                variant="ghost"
                onPress={() => {
                  toggleTheme();
                }}>
                <T> Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode</T>
              </Button>
            </V>
          </V>
        </V>
      </Modal>
    </>
  );
};

export default Nav;
