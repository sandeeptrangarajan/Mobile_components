import { ComponentCategory, CategoryInfo, RepairDifficulty } from '../types';

export const CATEGORIES_DATA: CategoryInfo[] = [
  {
    name: 'Display and Body',
    slug: 'display-and-body',
    description: 'Screens, touch digitizers, back glass covers, and chassis structural frames.',
    iconName: 'Smartphone',
    componentCount: 4
  },
  {
    name: 'Power and Charging',
    slug: 'power-and-charging',
    description: 'Batteries, sub-charging boards, USB ports, and wireless charging induction coils.',
    iconName: 'BatteryCharging',
    componentCount: 5
  },
  {
    name: 'Cameras',
    slug: 'cameras',
    description: 'Main multi-lens rear modules, front selfie cameras, and exterior sapphire/glass lenses.',
    iconName: 'Camera',
    componentCount: 3
  },
  {
    name: 'Audio',
    slug: 'audio',
    description: 'Loudspeakers, call receiver earpieces, MEMS microphones, and haptic vibration motors.',
    iconName: 'Volume2',
    componentCount: 4
  },
  {
    name: 'Connectivity',
    slug: 'connectivity',
    description: 'SIM trays, SIM readers, Wi-Fi 6E/7 ICs, Bluetooth controllers, and RF antenna lines.',
    iconName: 'Wifi',
    componentCount: 6
  },
  {
    name: 'Sensors',
    slug: 'sensors',
    description: 'Ultrasonic/optical fingerprint sensors, 3D Face ID projectors, proximity & motion ICs.',
    iconName: 'Radio',
    componentCount: 5
  },
  {
    name: 'Internal Hardware',
    slug: 'internal-hardware',
    description: 'Main logic boards, APU processors, LPDDR5X RAM, and UFS/NVMe storage chips.',
    iconName: 'Cpu',
    componentCount: 4
  },
  {
    name: 'Buttons and Connectors',
    slug: 'buttons-and-connectors',
    description: 'Power and volume keys, tactile side clickers, FPC board connectors, and ribbon cables.',
    iconName: 'ToggleRight',
    componentCount: 5
  },
  {
    name: 'Other Spare Parts',
    slug: 'other-spare-parts',
    description: 'Chassis screw sets, die-cut IP68 waterproof adhesive gaskets, and bracket plates.',
    iconName: 'Wrench',
    componentCount: 3
  }
];

export interface ComponentTemplate {
  componentNumber: number;
  name: string;
  slug: string;
  category: ComponentCategory;
  categorySlug: string;
  basicFunction: string;
  repairDifficulty: RepairDifficulty;
  estimatedTimeMins: number;
  basePriceINR: number;
  iconName: string;
  requiredTools: string[];
  installationTip: string;
  technicalSpecsDefaults: Record<string, string>;
}

export const MASTER_39_COMPONENTS: ComponentTemplate[] = [
  // --- Display and Body (4) ---
  {
    componentNumber: 1,
    name: 'Display / Screen',
    slug: 'display-screen',
    category: 'Display and Body',
    categorySlug: 'display-and-body',
    basicFunction: 'Renders visual images, operating system UI, video playback, and high refresh rate motion.',
    repairDifficulty: 'Advanced',
    estimatedTimeMins: 45,
    basePriceINR: 5800,
    iconName: 'Tv',
    requiredTools: ['Heat Gun / Heating Mat (80°C)', 'iSclack / Heavy Suction Cup', 'Thin Plastic Pry Cards', 'T-7000 / B-7000 Adhesive', 'ESD Tweezers'],
    installationTip: 'Always disconnect battery before connecting new display flex to avoid backlight inverter fuse blow.',
    technicalSpecsDefaults: {
      'Panel Type': 'AMOLED / OLED / IPS Grade A+',
      'Refresh Rate': '120Hz Variable / 90Hz',
      'Color Gamut': 'DCI-P3 100%',
      'Glass Type': 'Corning Gorilla Glass Victus+'
    }
  },
  {
    componentNumber: 2,
    name: 'Touchscreen / Digitizer',
    slug: 'touchscreen-digitizer',
    category: 'Display and Body',
    categorySlug: 'display-and-body',
    basicFunction: 'Detects finger touch coordinates, gesture inputs, and multi-touch response across the surface glass.',
    repairDifficulty: 'Expert',
    estimatedTimeMins: 60,
    basePriceINR: 1950,
    iconName: 'HandMetal',
    requiredTools: ['OCA Laminating Machine', 'Wire Separator (0.028mm)', 'Debubbler Chamber', 'UV Curing Lamp', 'Isopropanol 99%'],
    installationTip: 'Glass-only refurbishing requires specialized vacuum lamination; complete screen assembly is recommended for mobile workshops.',
    technicalSpecsDefaults: {
      'Touch Sampling Rate': '240Hz / 360Hz',
      'Multi-Touch Points': '10-point capacitive',
      'Coating': 'Oleophobic anti-fingerprint nano-coat'
    }
  },
  {
    componentNumber: 27,
    name: 'Back Panel',
    slug: 'back-panel',
    category: 'Display and Body',
    categorySlug: 'display-and-body',
    basicFunction: 'Encloses the rear internals, shields internal RF components, and provides exterior aesthetic finish.',
    repairDifficulty: 'Beginner',
    estimatedTimeMins: 20,
    basePriceINR: 1450,
    iconName: 'Layers',
    requiredTools: ['Heat Gun (70°C)', 'Suction Handle', 'Plastic Guitar Picks', 'Pre-cut Waterproof Back Adhesive Tape'],
    installationTip: 'Ensure all dried glue residue is completely scraped from frame before seating the new panel to maintain flush fit.',
    technicalSpecsDefaults: {
      'Material': 'Gorilla Glass / Vegan Leather / Polycarbonate',
      'Finish': 'Matte Frosted / Glossy Ceramic',
      'Camera Bezel Pre-installed': 'Yes'
    }
  },
  {
    componentNumber: 28,
    name: 'Frame / Body',
    slug: 'frame-body',
    category: 'Display and Body',
    categorySlug: 'display-and-body',
    basicFunction: 'Central structural chassis that supports motherboard, battery cavity, display mount, and side buttons.',
    repairDifficulty: 'Expert',
    estimatedTimeMins: 90,
    basePriceINR: 3200,
    iconName: 'Box',
    requiredTools: ['Full Disassembly Kit', 'Torx T3/T4', 'Phillips #000', 'ESD Mat', 'Labelled Screw Tray'],
    installationTip: 'Full housing replacement requires transferring every micro-component; document screw lengths meticulously.',
    technicalSpecsDefaults: {
      'Chassis Alloy': 'Armor Aluminum / Titanium Grade 5 / Magnesium',
      'Thermal Heatpipe': 'Integrated Copper Vapor Chamber',
      'Antenna Bands': 'Injection molded RF pass-through'
    }
  },

  // --- Power and Charging (5) ---
  {
    componentNumber: 3,
    name: 'Battery',
    slug: 'battery',
    category: 'Power and Charging',
    categorySlug: 'power-and-charging',
    basicFunction: 'Stores chemical energy and supplies regulated direct current (DC) to phone motherboards and sub-circuits.',
    repairDifficulty: 'Moderate',
    estimatedTimeMins: 30,
    basePriceINR: 2200,
    iconName: 'BatteryCharging',
    requiredTools: ['Battery Pull-tab Grippers', 'Plastic Spudger (Non-conductive)', 'Isopropanol for Adhesive Release', 'Replacement Stretch Adhesive Strips'],
    installationTip: 'Never use metal tweezers near lithium pouches to avoid hazardous puncture and thermal runaway.',
    technicalSpecsDefaults: {
      'Chemistry': 'Lithium-Ion Polymer (Li-Po / Li-Ion)',
      'Nominal Voltage': '3.87V - 4.45V High Voltage',
      'Protection IC': 'Integrated Overcharge & Thermal Cutoff'
    }
  },
  {
    componentNumber: 4,
    name: 'Charging Port',
    slug: 'charging-port',
    category: 'Power and Charging',
    categorySlug: 'power-and-charging',
    basicFunction: 'Physical USB-C / Lightning port interface for cable power input, fast-charge negotiation, and OTG data.',
    repairDifficulty: 'Moderate',
    estimatedTimeMins: 35,
    basePriceINR: 850,
    iconName: 'Plug',
    requiredTools: ['Precision Phillips Screwdriver', 'Plastic Pry Tool', 'Anti-static Tweezers', 'Magnifying Lamp'],
    installationTip: 'Clean speaker dust mesh and ensure microphone rubber gasket is correctly transferred.',
    technicalSpecsDefaults: {
      'Port Standard': 'USB Type-C 2.0 / 3.2 Gen 2 / Lightning',
      'Pin Count': '24-pin SMT / Reversible',
      'Fast Charge Protocols': 'PD 3.0 / QC 4.0+ / VOOC / SuperCharge'
    }
  },
  {
    componentNumber: 5,
    name: 'Charging Board',
    slug: 'charging-board',
    category: 'Power and Charging',
    categorySlug: 'power-and-charging',
    basicFunction: 'Secondary PCB (sub-board) hosting charging port, primary microphone, vibration motor connector, and RF antenna feed.',
    repairDifficulty: 'Moderate',
    estimatedTimeMins: 25,
    basePriceINR: 1150,
    iconName: 'Cpu',
    requiredTools: ['Phillips #000', 'Plastic Spudger', 'Coaxial Cable Detacher Tool'],
    installationTip: 'Use sub-board with OEM IC components to guarantee original fast charging speeds and full network reception.',
    technicalSpecsDefaults: {
      'Sub-board Circuit': 'Multi-layer FR4 with ESD Surge Suppression',
      'Integrated Components': 'Primary MEMS Mic, Lower Antenna Coupler',
      'Interconnect': 'Main-to-Sub FPC Connector'
    }
  },
  {
    componentNumber: 30,
    name: 'USB Connector',
    slug: 'usb-connector',
    category: 'Power and Charging',
    categorySlug: 'power-and-charging',
    basicFunction: 'Surface-mount receptacle connector soldered onto the sub-board for technicians performing micro-soldering.',
    repairDifficulty: 'Expert',
    estimatedTimeMins: 45,
    basePriceINR: 350,
    iconName: 'Usb',
    requiredTools: ['Hot Air Rework Station (340°C)', 'Soldering Iron (Fine Conical Tip)', 'Rosin Flux Paste', 'Desoldering Braid / Wick'],
    installationTip: 'Shield nearby plastic connectors with Kapton tape before applying direct hot air.',
    technicalSpecsDefaults: {
      'Type': 'USB-C Female Jack SMT + Through-hole anchor legs',
      'Durability Rating': '10,000+ insertion cycles',
      'Contact Plating': 'Gold flash over nickel'
    }
  },
  {
    componentNumber: 31,
    name: 'Wireless Charging Coil',
    slug: 'wireless-charging-coil',
    category: 'Power and Charging',
    categorySlug: 'power-and-charging',
    basicFunction: 'Ferrite-backed planar induction copper coil that receives Qi magnetic fields and enables reverse wireless sharing.',
    repairDifficulty: 'Moderate',
    estimatedTimeMins: 30,
    basePriceINR: 1250,
    iconName: 'Zap',
    requiredTools: ['Phillips Screwdriver', 'Plastic Opening Pick', 'NFC/Coil Alignment Template'],
    installationTip: 'Often integrated with NFC coil and thermal thermistor; ensure gold contact pins seat firmly against motherboard pads.',
    technicalSpecsDefaults: {
      'Protocol': 'Qi 1.3 / MagSafe Compatible',
      'Peak Power Transfer': '15W - 50W Fast Wireless',
      'Shielding': 'Multi-layer Ferrite Sheet'
    }
  },

  // --- Cameras (3) ---
  {
    componentNumber: 10,
    name: 'Rear Camera',
    slug: 'rear-camera',
    category: 'Cameras',
    categorySlug: 'cameras',
    basicFunction: 'Primary camera module containing primary wide-angle, telephoto periscope, and ultra-wide image sensors with OIS motors.',
    repairDifficulty: 'Moderate',
    estimatedTimeMins: 35,
    basePriceINR: 4200,
    iconName: 'Camera',
    requiredTools: ['Plastic Spudger', 'ESD Tweezers', 'Anti-dust Blower Bulb', 'Lens Cleaning Microfiber'],
    installationTip: 'Avoid touching sensor glass; do not use compressed chemical air duster directly onto optical image stabilizer.',
    technicalSpecsDefaults: {
      'Sensor Brand': 'Sony LYT / IMX or Samsung ISOCELL',
      'Stabilization': 'Hardware OIS (Optical Image Stabilization)',
      'Aperture': 'f/1.4 - f/1.9 Large Aperture'
    }
  },
  {
    componentNumber: 11,
    name: 'Front Camera',
    slug: 'front-camera',
    category: 'Cameras',
    categorySlug: 'cameras',
    basicFunction: 'Selfie camera module situated behind display punch-hole or notch for video calls, selfies, and face unlock.',
    repairDifficulty: 'Moderate',
    estimatedTimeMins: 30,
    basePriceINR: 1650,
    iconName: 'Smile',
    requiredTools: ['Phillips #000', 'Plastic Spudger', 'Dust-free Swabs'],
    installationTip: 'Position lens rubber dampener precisely to avoid light leakage from screen backlight into selfies.',
    technicalSpecsDefaults: {
      'Resolution': '12MP - 50MP AF',
      'Field of View': '85° - 90° Wide Angle',
      'Video Support': '4K 60fps / 1080p HDR'
    }
  },
  {
    componentNumber: 12,
    name: 'Camera Lens',
    slug: 'camera-lens',
    category: 'Cameras',
    categorySlug: 'cameras',
    basicFunction: 'External sapphire or scratch-resistant optical glass protection disc positioned over camera housing.',
    repairDifficulty: 'Beginner',
    estimatedTimeMins: 20,
    basePriceINR: 450,
    iconName: 'Disc',
    requiredTools: ['Heat Gun / Hairdryer', 'Curved Tweezers', 'Mini Glass Breaker', 'UV Glass Sealant / 3M Ring Adhesive'],
    installationTip: 'Clean camera sensor completely of microscopic shards before mounting new lens to avoid blurred photos.',
    technicalSpecsDefaults: {
      'Material': 'Synthetic Sapphire Glass / Tempered 9H',
      'Coating': 'Anti-reflective (AR) & Hydrophobic',
      'Adhesive': 'Die-cut double-sided acrylic ring'
    }
  },

  // --- Audio (4) ---
  {
    componentNumber: 13,
    name: 'Speaker',
    slug: 'speaker',
    category: 'Audio',
    categorySlug: 'audio',
    basicFunction: 'Bottom loudspeaker box producing media playback, ringtones, speakerphone audio, and stereo channel output.',
    repairDifficulty: 'Beginner',
    estimatedTimeMins: 20,
    basePriceINR: 750,
    iconName: 'Volume2',
    requiredTools: ['Phillips #000', 'Plastic Pry Spudger'],
    installationTip: 'Ensure acoustic damping foam rubber gasket is in place for rich bass resonance and water sealing.',
    technicalSpecsDefaults: {
      'Type': 'Dynamic Stereo Loudspeaker Box',
      'Impedance': '8 Ohm / High SPL output',
      'Acoustic Chamber': 'Integrated bass resonance cavity'
    }
  },
  {
    componentNumber: 14,
    name: 'Earpiece',
    slug: 'earpiece',
    category: 'Audio',
    categorySlug: 'audio',
    basicFunction: 'Top receiver speaker delivering caller voice audio to ear during phone calls and serving as upper stereo channel.',
    repairDifficulty: 'Moderate',
    estimatedTimeMins: 30,
    basePriceINR: 650,
    iconName: 'Headphones',
    requiredTools: ['Fine ESD Tweezers', 'Plastic Spudger', 'Dust Mesh Replacement Tool'],
    installationTip: 'Frequently clogged with makeup or earwax; test mesh cleaning first before replacing physical module.',
    technicalSpecsDefaults: {
      'Frequency Response': '300Hz - 8kHz Voice Optimized',
      'Power Rating': '0.5W - 1W RMS',
      'Contact': 'Spring-loaded gold pressure contacts'
    }
  },
  {
    componentNumber: 15,
    name: 'Microphone',
    slug: 'microphone',
    category: 'Audio',
    categorySlug: 'audio',
    basicFunction: 'Captures user speech, video sound recording, and ambient noise cancellation for clear voice calling.',
    repairDifficulty: 'Advanced',
    estimatedTimeMins: 40,
    basePriceINR: 550,
    iconName: 'Mic',
    requiredTools: ['Hot Air Gun / Soldering Iron', 'Silicone Sound Guide Gasket', 'Magnification Scope'],
    installationTip: 'Never block microphone acoustic sound tunnel port with excess liquid glue or solder flux.',
    technicalSpecsDefaults: {
      'Type': 'Digital MEMS Microphone (Silicon)',
      'Signal-to-Noise Ratio (SNR)': '64dB+ Ultra-low noise',
      'Configuration': 'Dual / Triple Noise-Cancelling Array'
    }
  },
  {
    componentNumber: 16,
    name: 'Vibration Motor',
    slug: 'vibration-motor',
    category: 'Audio',
    categorySlug: 'audio',
    basicFunction: 'Generates tactile feedback for keyboard typing, incoming notifications, calls, and game vibrations.',
    repairDifficulty: 'Moderate',
    estimatedTimeMins: 25,
    basePriceINR: 650,
    iconName: 'Activity',
    requiredTools: ['Plastic Pry Tool', 'Double-sided Haptic Mount Tape'],
    installationTip: 'X-axis linear motors must be firmly stuck to chassis metal frame to transfer vibration waveforms without rattling.',
    technicalSpecsDefaults: {
      'Motor Type': 'X-Axis Linear Resonance Actuator (LRA) / Taptic Engine',
      'Response Latency': '<5ms Crisp transient stop/start',
      'Frequency': '170Hz - 235Hz resonant'
    }
  },

  // --- Connectivity (6) ---
  {
    componentNumber: 21,
    name: 'SIM Card Tray',
    slug: 'sim-card-tray',
    category: 'Connectivity',
    categorySlug: 'connectivity',
    basicFunction: 'Removable exterior slot holder securing Nano-SIM cards and MicroSD memory cards into the internal reader.',
    repairDifficulty: 'Beginner',
    estimatedTimeMins: 2,
    basePriceINR: 280,
    iconName: 'CreditCard',
    requiredTools: ['SIM Ejector Pin (0.8mm)'],
    installationTip: 'Ensure color and model revision match; verify pre-installed rubber seal prevents water ingress.',
    technicalSpecsDefaults: {
      'Form Factor': 'Dual Nano-SIM / Hybrid MicroSD slot',
      'Material': 'Anodized Aluminum + Polymer carrier',
      'Waterproof Seal': 'Silicone O-Ring Gasket'
    }
  },
  {
    componentNumber: 22,
    name: 'SIM Reader',
    slug: 'sim-reader',
    category: 'Connectivity',
    categorySlug: 'connectivity',
    basicFunction: 'Internal gold-plated connector socket on motherboard that reads SIM card smart IC contact points.',
    repairDifficulty: 'Expert',
    estimatedTimeMins: 55,
    basePriceINR: 750,
    iconName: 'Cpu',
    requiredTools: ['Hot Air Station', 'Liquid Rosin Flux', 'Stereo Microscope', 'Solder Wick'],
    installationTip: 'Bent pins can sometimes be realigned under microscope without requiring board-level desoldering.',
    technicalSpecsDefaults: {
      'Contact Pins': '6-pin / 8-pin Gold-plated Phosphor Bronze',
      'Eject Mechanism': 'Push-Push or Pin Push lever'
    }
  },
  {
    componentNumber: 23,
    name: 'Wi-Fi Module',
    slug: 'wi-fi-module',
    category: 'Connectivity',
    categorySlug: 'connectivity',
    basicFunction: 'High-speed wireless local area network IC chip handling 2.4GHz, 5GHz, and 6GHz IEEE 802.11be/ax bands.',
    repairDifficulty: 'Expert',
    estimatedTimeMins: 75,
    basePriceINR: 2600,
    iconName: 'Wifi',
    requiredTools: ['BGA Reballing Stencil', 'BGA Soldering Flux', '0.25mm Solder Balls', 'IR Preheater'],
    installationTip: 'Wi-Fi IC replacement on modern phones requires baseband pairing or programmer calibration.',
    technicalSpecsDefaults: {
      'Standards': 'Wi-Fi 7 / Wi-Fi 6E (802.11be/ax)',
      'Throughput': 'Up to 5.8 Gbps (MIMO 2x2)',
      'Package': 'BGA IC Chip'
    }
  },
  {
    componentNumber: 24,
    name: 'Bluetooth Module',
    slug: 'bluetooth-module',
    category: 'Connectivity',
    categorySlug: 'connectivity',
    basicFunction: 'Short-range wireless transceiver enabling Bluetooth audio (LE Audio, aptX, LDAC) and wearable syncing.',
    repairDifficulty: 'Expert',
    estimatedTimeMins: 70,
    basePriceINR: 2100,
    iconName: 'Bluetooth',
    requiredTools: ['BGA Rework Station', 'Microscope', 'Thermal Shielding Tape'],
    installationTip: 'Usually integrated into combination Wi-Fi/BT SoC module.',
    technicalSpecsDefaults: {
      'Version': 'Bluetooth 5.4 / 5.3 Low Energy',
      'Range': 'Up to 20 meters indoors',
      'Audio Codecs': 'SBC, AAC, LDAC, aptX Adaptive'
    }
  },
  {
    componentNumber: 25,
    name: 'Antenna',
    slug: 'antenna',
    category: 'Connectivity',
    categorySlug: 'connectivity',
    basicFunction: 'Flexible printed circuit (FPC) strip and coaxial lines radiating 5G Sub-6, 4G LTE, and GPS satellite signals.',
    repairDifficulty: 'Moderate',
    estimatedTimeMins: 30,
    basePriceINR: 650,
    iconName: 'Radio',
    requiredTools: ['Coaxial Snap Tool', 'Plastic Spudger', 'Anti-static Tweezers'],
    installationTip: 'Ensure tiny coaxial connectors snap securely with an audible click; pinched cables reduce signal bars.',
    technicalSpecsDefaults: {
      'Frequency Range': '600MHz - 6GHz Sub-6 5G & GNSS',
      'Impedance': '50 Ohm matched coaxial line'
    }
  },
  {
    componentNumber: 26,
    name: 'Network / RF Components',
    slug: 'network-rf-components',
    category: 'Connectivity',
    categorySlug: 'connectivity',
    basicFunction: 'RF front-end modules including Power Amplifiers (PA), RF Transceivers, and duplexer filters for cellular signal.',
    repairDifficulty: 'Expert',
    estimatedTimeMins: 80,
    basePriceINR: 3400,
    iconName: 'Antenna',
    requiredTools: ['BGA Hot Air Station', 'RF Spectrum Analyzer / GSM Tester', 'BGA Flux'],
    installationTip: 'No Network / Emergency Calls Only often traces to cracked PA solder balls after heavy drops.',
    technicalSpecsDefaults: {
      'Components': 'Power Amplifier Module (PAM), Antenna Switch (ASM)',
      'Bands': '5G SA/NSA, 4G LTE, 3G WCDMA, 2G GSM'
    }
  },

  // --- Sensors (5) ---
  {
    componentNumber: 19,
    name: 'Fingerprint Sensor',
    slug: 'fingerprint-sensor',
    category: 'Sensors',
    categorySlug: 'sensors',
    basicFunction: 'Biometric security reader (under-display optical/ultrasonic or side power-button capacitive) scanning ridges.',
    repairDifficulty: 'Advanced',
    estimatedTimeMins: 40,
    basePriceINR: 1750,
    iconName: 'Fingerprint',
    requiredTools: ['Plastic Pry Tool', 'Optical Calibration Rubber Box / Software Tool', 'Phillips Screwdriver'],
    installationTip: 'Under-display optical fingerprint sensors require optical recalibration tool after screen replacement.',
    technicalSpecsDefaults: {
      'Type': 'Ultrasonic 3D / In-Display Optical / Side Capacitive',
      'Scan Time': '<250ms',
      'Security': 'Encrypted Secure Enclave match'
    }
  },
  {
    componentNumber: 20,
    name: 'Face Recognition Hardware',
    slug: 'face-recognition-hardware',
    category: 'Sensors',
    categorySlug: 'sensors',
    basicFunction: 'Dot projector, infrared camera, and flood illuminator module projecting 30,000 IR dots for secure 3D facial authentication.',
    repairDifficulty: 'Expert',
    estimatedTimeMins: 50,
    basePriceINR: 3800,
    iconName: 'ScanFace',
    requiredTools: ['Face ID Alignment Jig', 'Micro Soldering Iron', 'Dot Projector Programmer (i2C / JCID)'],
    installationTip: 'Paired to motherboard security processor; transfers require specialized flex programmer to retain Face ID functionality.',
    technicalSpecsDefaults: {
      'Sub-modules': 'Infrared Camera + Dot Projector + Flood Illuminator',
      'Wavelength': '940nm Invisible IR',
      'Security': 'TrueDepth / 3D Structured Light'
    }
  },
  {
    componentNumber: 32,
    name: 'Proximity Sensor',
    slug: 'proximity-sensor',
    category: 'Sensors',
    categorySlug: 'sensors',
    basicFunction: 'Detects ear proximity during phone calls to turn off display screen and prevent accidental cheek button presses.',
    repairDifficulty: 'Moderate',
    estimatedTimeMins: 30,
    basePriceINR: 750,
    iconName: 'EyeOff',
    requiredTools: ['Plastic Spudger', 'Light Guide Rubber Grommet', 'Tweezers'],
    installationTip: 'Ensure the rubber light divider between IR emitter and receiver is not missing, or sensor will trigger false positives.',
    technicalSpecsDefaults: {
      'Sensor Type': 'Infrared Time-of-Flight (ToF) / Virtual Proximity AI',
      'Detection Distance': '0 - 5 cm',
      'Ambient Light Integration': 'Integrated lux light sensor'
    }
  },
  {
    componentNumber: 33,
    name: 'Accelerometer',
    slug: 'accelerometer',
    category: 'Sensors',
    categorySlug: 'sensors',
    basicFunction: 'Measures linear acceleration and gravitational forces for screen rotation, step counting, and shake gestures.',
    repairDifficulty: 'Expert',
    estimatedTimeMins: 60,
    basePriceINR: 1100,
    iconName: 'Compass',
    requiredTools: ['BGA Hot Air Gun', 'SMD Tweezers', 'Flux'],
    installationTip: 'Typically housed in 6-axis combined IMU package on logic board.',
    technicalSpecsDefaults: {
      'Axes': '3-Axis X, Y, Z',
      'Range': '±2g / ±4g / ±8g / ±16g dynamically selectable',
      'Bus': 'I2C / SPI digital output'
    }
  },
  {
    componentNumber: 34,
    name: 'Gyroscope',
    slug: 'gyroscope',
    category: 'Sensors',
    categorySlug: 'sensors',
    basicFunction: 'Detects angular velocity and rotational motion for camera video stabilization, AR apps, and mobile gaming steering.',
    repairDifficulty: 'Expert',
    estimatedTimeMins: 60,
    basePriceINR: 1200,
    iconName: 'RotateCcw',
    requiredTools: ['Hot Air SMD Station', 'Microscope', 'Low-melt Solder'],
    installationTip: 'Defective gyro causes camera OIS oscillation or frozen compass bearings.',
    technicalSpecsDefaults: {
      'Measurement': '3-Axis Angular rate',
      'Sensitivity': '±250 to ±2000 degrees per second (dps)',
      'Package': 'LGA-14 MEMS Silicon'
    }
  },

  // --- Internal Hardware (4) ---
  {
    componentNumber: 6,
    name: 'Motherboard',
    slug: 'motherboard',
    category: 'Internal Hardware',
    categorySlug: 'internal-hardware',
    basicFunction: 'Central main circuit logic board connecting CPU, memory, power management ICs, radios, and peripheral connectors.',
    repairDifficulty: 'Expert',
    estimatedTimeMins: 90,
    basePriceINR: 14500,
    iconName: 'CircuitBoard',
    requiredTools: ['Complete Precision Driver Set', 'Anti-static Wrist Strap', 'Thermal Conductive Paste', 'SIM Pin'],
    installationTip: 'Ensure thermal paste / thermal pads are replaced between CPU shield can and phone metal chassis.',
    technicalSpecsDefaults: {
      'Board Design': 'Stacked Sandwich Multi-layer PCB (HDI)',
      'Operating System Pre-loaded': 'Yes (Clean Factory State)',
      'SIM Support': 'Unlocked all carrier bands'
    }
  },
  {
    componentNumber: 7,
    name: 'Processor',
    slug: 'processor',
    category: 'Internal Hardware',
    categorySlug: 'internal-hardware',
    basicFunction: 'System on Chip (SoC) executing computational tasks, graphics processing (GPU), and neural machine learning (NPU).',
    repairDifficulty: 'Expert',
    estimatedTimeMins: 120,
    basePriceINR: 7500,
    iconName: 'Cpu',
    requiredTools: ['BGA CNC Milling Machine / Hot Air Desoldering', 'Custom CPU Reball Stencil', 'Flux', 'Thermal Paste'],
    installationTip: 'CPU chip-swaps require dual-layer desoldering (RAM over CPU package-on-package PoP). Highly specialized work.',
    technicalSpecsDefaults: {
      'Architecture': 'ARM64 64-bit Octa-Core',
      'Process Node': '3nm / 4nm FinFET / GAA',
      'NPU Performance': 'Up to 45 TOPS on-device AI'
    }
  },
  {
    componentNumber: 8,
    name: 'RAM',
    slug: 'ram',
    category: 'Internal Hardware',
    categorySlug: 'internal-hardware',
    basicFunction: 'High-speed volatile operational memory holding running apps and active background processes for instant multitasking.',
    repairDifficulty: 'Expert',
    estimatedTimeMins: 90,
    basePriceINR: 3200,
    iconName: 'Layers',
    requiredTools: ['PoP Reballing Stencil', 'Low-temp Solder Paste (138°C)', 'Magnification Scope'],
    installationTip: 'Mounted directly on top of CPU in Package-on-Package (PoP) layout on flagship handsets.',
    technicalSpecsDefaults: {
      'Memory Type': 'LPDDR5X / LPDDR5',
      'Bus Speed': 'Up to 8533 Mbps',
      'Capacity': '8GB / 12GB / 16GB'
    }
  },
  {
    componentNumber: 9,
    name: 'Internal Storage',
    slug: 'internal-storage',
    category: 'Internal Hardware',
    categorySlug: 'internal-hardware',
    basicFunction: 'Non-volatile flash NAND chip storing operating system files, firmware, user data, photos, and installed apps.',
    repairDifficulty: 'Expert',
    estimatedTimeMins: 90,
    basePriceINR: 4200,
    iconName: 'HardDrive',
    requiredTools: ['BGA-153 / BGA-254 NAND Programmer', 'NAND Reball Stencil', 'Solder Wick', 'Thermal Shield'],
    installationTip: 'Storage chip upgrades require flashing raw model partition tables via hardware programmer before soldering.',
    technicalSpecsDefaults: {
      'Interface': 'UFS 4.0 / UFS 3.1 / NVMe PCIe',
      'Read Speeds': 'Up to 4200 MB/s sequential',
      'Capacity': '128GB / 256GB / 512GB / 1TB'
    }
  },

  // --- Buttons and Connectors (5) ---
  {
    componentNumber: 17,
    name: 'Power Button',
    slug: 'power-button',
    category: 'Buttons and Connectors',
    categorySlug: 'buttons-and-connectors',
    basicFunction: 'External metal/plastic button cap and internal tactile switch flex controlling device power on/off and screen wake.',
    repairDifficulty: 'Moderate',
    estimatedTimeMins: 25,
    basePriceINR: 420,
    iconName: 'Power',
    requiredTools: ['Fine Tweezers', 'C-clip / Retaining Bracket Tool', 'Phillips #000'],
    installationTip: 'Ensure small silicone clicker nub on back of external button is intact to provide satisfying tactile click.',
    technicalSpecsDefaults: {
      'Switch Rating': '300,000+ click cycles',
      'Material': 'Metal actuator dome on polyimide flex'
    }
  },
  {
    componentNumber: 18,
    name: 'Volume Buttons',
    slug: 'volume-buttons',
    category: 'Buttons and Connectors',
    categorySlug: 'buttons-and-connectors',
    basicFunction: 'Dual tactile micro-switch flex and external rockers for adjusting volume up/down, camera shutter, and recovery mode.',
    repairDifficulty: 'Moderate',
    estimatedTimeMins: 25,
    basePriceINR: 450,
    iconName: 'Sliders',
    requiredTools: ['Curved Tweezers', 'Plastic Spudger', 'Small Phillips Screwdriver'],
    installationTip: 'Route ribbon cable in dedicated frame channel to prevent pinch damage when reinstalling battery.',
    technicalSpecsDefaults: {
      'Switch Type': 'Dual metal dome contact switches',
      'Flex Substrate': 'Polyimide FPC with gold contacts'
    }
  },
  {
    componentNumber: 29,
    name: 'Side Buttons',
    slug: 'side-buttons',
    category: 'Buttons and Connectors',
    categorySlug: 'buttons-and-connectors',
    basicFunction: 'Set of physical external button keys (Power, Volume Rocker, Alert Slider, Action/Camera Control Button).',
    repairDifficulty: 'Beginner',
    estimatedTimeMins: 15,
    basePriceINR: 350,
    iconName: 'ToggleLeft',
    requiredTools: ['Precision Tweezers', 'Rubber Gasket Ring Placer'],
    installationTip: 'Check waterproof micro-rings surrounding button shafts to ensure water resistance is retained.',
    technicalSpecsDefaults: {
      'Material': 'CNC Machined Anodized Aluminum / Stainless Steel',
      'Waterproofing': 'Micro-silicone seal rings included'
    }
  },
  {
    componentNumber: 35,
    name: 'Motherboard Connectors',
    slug: 'motherboard-connectors',
    category: 'Buttons and Connectors',
    categorySlug: 'buttons-and-connectors',
    basicFunction: 'Miniature Board-to-Board (B2B) male/female receptacle sockets soldered to PCB mating with display and battery flex cables.',
    repairDifficulty: 'Expert',
    estimatedTimeMins: 45,
    basePriceINR: 480,
    iconName: 'Network',
    requiredTools: ['Low-temperature Hot Air (280°C)', 'Liquid Rosin Flux', 'Stereo Microscope', 'Fine Curved Tweezers'],
    installationTip: 'Never apply force when clicking connectors; misaligned pins will crush delicate gold contacts.',
    technicalSpecsDefaults: {
      'Pitch': '0.35mm / 0.4mm Ultra-fine pitch',
      'Pin Count': '10-pin to 60-pin B2B connectors',
      'Locking': 'Tactile friction click retention'
    }
  },
  {
    componentNumber: 36,
    name: 'Flex Cables',
    slug: 'flex-cables',
    category: 'Buttons and Connectors',
    categorySlug: 'buttons-and-connectors',
    basicFunction: 'Flat Flexible Printed Circuit (FPC) main interconnect ribbons bridging motherboard, sub-board, display, and camera modules.',
    repairDifficulty: 'Moderate',
    estimatedTimeMins: 25,
    basePriceINR: 680,
    iconName: 'GitFork',
    requiredTools: ['Plastic Spudger', 'Anti-static Tweezers'],
    installationTip: 'Never fold flex cables past their 90-degree engineered bend radii to prevent trace fracture.',
    technicalSpecsDefaults: {
      'Traces': 'Multi-layer rolled copper foil in polyimide',
      'Shielding': 'Silver/aluminum EMI interference shield layer'
    }
  },

  // --- Other Spare Parts (3) ---
  {
    componentNumber: 37,
    name: 'Internal Screws',
    slug: 'internal-screws',
    category: 'Other Spare Parts',
    categorySlug: 'other-spare-parts',
    basicFunction: 'Complete OEM precision screw assortment securing internal shield brackets, logic boards, speakers, and chassis.',
    repairDifficulty: 'Beginner',
    estimatedTimeMins: 10,
    basePriceINR: 220,
    iconName: 'Crosshair',
    requiredTools: ['Phillips #000', 'Pentalobe P2', 'Torx T3/T4', 'Tri-point Y000', 'Magnetic Screw Mat'],
    installationTip: 'CRITICAL: Never install a long screw into a short screw hole; long-screw damage destroys motherboard circuit traces.',
    technicalSpecsDefaults: {
      'Head Types': 'Phillips, Standoff, Torx, Tri-point Y000',
      'Plating': 'Nickel-plated non-corrosive carbon steel',
      'Thread Locking': 'Pre-applied blue Loctite nylon threadlocker'
    }
  },
  {
    componentNumber: 38,
    name: 'Waterproof Seals',
    slug: 'waterproof-seals',
    category: 'Other Spare Parts',
    categorySlug: 'other-spare-parts',
    basicFunction: 'Custom laser-cut closed-cell foam and acrylic adhesive gaskets creating IP68 dust- and water-resistant perimeter seals.',
    repairDifficulty: 'Moderate',
    estimatedTimeMins: 20,
    basePriceINR: 320,
    iconName: 'Droplets',
    requiredTools: ['Frame Cleaning Solvent (Alcohol 99%)', 'Adhesive Primer Pen', 'Pressure Roller Clamp'],
    installationTip: 'Surface must be 100% clean of grease and old glue; apply uniform clamp pressure for 15 minutes after installation.',
    technicalSpecsDefaults: {
      'Standard': 'IP68 Ingress Protection Compliant',
      'Adhesive': '3M Waterproof Structural Acrylic Foam Tape'
    }
  },
  {
    componentNumber: 39,
    name: 'Other Replacement Parts',
    slug: 'other-replacement-parts',
    category: 'Other Spare Parts',
    categorySlug: 'other-spare-parts',
    basicFunction: 'Assorted secondary hardware including graphite thermal sheets, metal EMI bracket shields, speaker mesh grills, and plastic brackets.',
    repairDifficulty: 'Beginner',
    estimatedTimeMins: 15,
    basePriceINR: 290,
    iconName: 'Package',
    requiredTools: ['ESD Tweezers', 'Spudger', 'Small Phillips Screwdriver'],
    installationTip: 'Check that grounding spring clips on metal shields touch the chassis grounding points properly.',
    technicalSpecsDefaults: {
      'Assortment': 'Thermal graphite pad, ear speaker dust mesh, bracket set',
      'Material': 'Stainless steel & graphite laminate'
    }
  }
];
