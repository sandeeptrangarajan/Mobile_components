import React from 'react';
import {
  Smartphone,
  Tv,
  HandMetal,
  Layers,
  Box,
  BatteryCharging,
  Plug,
  Cpu,
  Usb,
  Zap,
  Camera,
  Smile,
  Disc,
  Volume2,
  Headphones,
  Mic,
  Activity,
  CreditCard,
  Wifi,
  Bluetooth,
  Radio,
  Antenna,
  Fingerprint,
  ScanFace,
  EyeOff,
  Compass,
  RotateCcw,
  CircuitBoard,
  HardDrive,
  Power,
  Sliders,
  ToggleLeft,
  ToggleRight,
  Network,
  GitFork,
  Crosshair,
  Droplets,
  Package,
  Wrench,
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

interface ComponentIconProps {
  name: string;
  className?: string;
}

export const ComponentIcon: React.FC<ComponentIconProps> = ({ name, className = 'w-6 h-6' }) => {
  switch (name) {
    case 'Smartphone':
      return <Smartphone className={className} />;
    case 'Tv':
      return <Tv className={className} />;
    case 'HandMetal':
      return <HandMetal className={className} />;
    case 'Layers':
      return <Layers className={className} />;
    case 'Box':
      return <Box className={className} />;
    case 'BatteryCharging':
      return <BatteryCharging className={className} />;
    case 'Plug':
      return <Plug className={className} />;
    case 'Cpu':
      return <Cpu className={className} />;
    case 'Usb':
      return <Usb className={className} />;
    case 'Zap':
      return <Zap className={className} />;
    case 'Camera':
      return <Camera className={className} />;
    case 'Smile':
      return <Smile className={className} />;
    case 'Disc':
      return <Disc className={className} />;
    case 'Volume2':
      return <Volume2 className={className} />;
    case 'Headphones':
      return <Headphones className={className} />;
    case 'Mic':
      return <Mic className={className} />;
    case 'Activity':
      return <Activity className={className} />;
    case 'CreditCard':
      return <CreditCard className={className} />;
    case 'Wifi':
      return <Wifi className={className} />;
    case 'Bluetooth':
      return <Bluetooth className={className} />;
    case 'Radio':
      return <Radio className={className} />;
    case 'Antenna':
      return <Antenna className={className} />;
    case 'Fingerprint':
      return <Fingerprint className={className} />;
    case 'ScanFace':
      return <ScanFace className={className} />;
    case 'EyeOff':
      return <EyeOff className={className} />;
    case 'Compass':
      return <Compass className={className} />;
    case 'RotateCcw':
      return <RotateCcw className={className} />;
    case 'CircuitBoard':
      return <CircuitBoard className={className} />;
    case 'HardDrive':
      return <HardDrive className={className} />;
    case 'Power':
      return <Power className={className} />;
    case 'Sliders':
      return <Sliders className={className} />;
    case 'ToggleLeft':
      return <ToggleLeft className={className} />;
    case 'ToggleRight':
      return <ToggleRight className={className} />;
    case 'Network':
      return <Network className={className} />;
    case 'GitFork':
      return <GitFork className={className} />;
    case 'Crosshair':
      return <Crosshair className={className} />;
    case 'Droplets':
      return <Droplets className={className} />;
    case 'Package':
      return <Package className={className} />;
    case 'Wrench':
      return <Wrench className={className} />;
    case 'ShieldCheck':
      return <ShieldCheck className={className} />;
    case 'Search':
      return <Search className={className} />;
    default:
      return <Cpu className={className} />;
  }
};
