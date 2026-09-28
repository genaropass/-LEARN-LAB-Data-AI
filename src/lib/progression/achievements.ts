import { Achievement } from '@/types/gamification';

export const ALL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_query',
    title: 'Primera Consulta Ejecutada',
    description: 'Construye y ejecuta tu primera sentencia SQL exitosa en el laboratorio.',
    icon: 'Target',
    category: 'progression'
  },
  {
    id: 'foundation_complete',
    title: 'Explorador Relacional',
    description: 'Domina las bases de SQL (SELECT, WHERE, ORDER BY, LIMIT).',
    icon: 'Compass',
    category: 'mastery'
  },
  {
    id: 'first_boss',
    title: 'Jefe Derrotado: Inteligencia de Ventas',
    description: 'Vence al Jefe SQL #01 resolviendo la auditoría comercial de múltiples etapas.',
    icon: 'Trophy',
    category: 'boss'
  },
  {
    id: 'joins_virtuoso',
    title: 'Constructor de Puentes',
    description: 'Conecta múltiples tablas con JOINs relacionales con total precisión.',
    icon: 'Link',
    category: 'mastery'
  },
  {
    id: 'second_boss',
    title: 'Comandante de Retención',
    description: 'Vence al Jefe SQL #02 analizando las cohortes de suscripciones activas.',
    icon: 'ShieldAlert',
    category: 'boss'
  },
  {
    id: 'window_wizard',
    title: 'Maestro Analítico',
    description: 'Segmenta y rankea series temporales usando Funciones Ventana.',
    icon: 'Zap',
    category: 'mastery'
  },
  {
    id: 'capstone_master',
    title: 'Arquitecto SQL Certificado',
    description: 'Completa el proyecto analítico integral de E-Commerce en el Nivel 100.',
    icon: 'Award',
    category: 'progression'
  },
  {
    id: 'streak_flame',
    title: 'Momento Imparable',
    description: 'Mantén una racha activa diaria de práctica en Learn-Lab.',
    icon: 'Flame',
    category: 'streak'
  }
];
