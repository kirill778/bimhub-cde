"use client"; // Если будете использовать хуки для активного состояния, например usePathname

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Для определения активного пункта меню
import styles from '@/app/dashboard/RightMenu.module.css'; // Подключаем CSS Module
import ProjectsIcon from '@/assets/icons/ix_projects.svg';
import ModelsIcon from '@/assets/icons/mingcute_cube-3d-line.svg';
import DocumentsIcon from '@/assets/icons/material-symbols-light_docs-outline.svg';
import TeamIcon from '@/assets/icons/mdi_people-outline.svg';
import ChatsIcon from '@/assets/icons/majesticons_chats.svg';
import ScheduleIcon from '@/assets/icons/uil_schedule.svg';
import SettingsIcon from '@/assets/icons/material-symbols_settings-outline.svg';


const IconPlaceholder = ({ char, size = 20 }: { char: string, size?: number }) => (
  <span style={{ fontSize: `${size}px`, display: 'inline-block', width: '24px', textAlign: 'center', lineHeight: '1' }}>{char}</span>
);

interface MenuItemData {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

const menuItems: MenuItemData[] = [
  { id: 'projects', label: 'Проекты', icon: <ProjectsIcon className={styles.icon} />, href: '/dashboard/projects' },
  { id: 'models', label: 'Модели', icon: <ModelsIcon className={styles.icon} />, href: '/dashboard/models' },
  { id: 'documents', label: 'Управление документами', icon: <DocumentsIcon className={styles.icon} />, href: '/dashboard/documents' },
  { id: 'team', label: 'Команда', icon: <TeamIcon className={styles.icon} />, href: '/dashboard/team' },
  { id: 'chats', label: 'Чаты', icon: <ChatsIcon className={styles.icon} />, href: '/dashboard/chats' },
  { id: 'schedule', label: 'Расписание', icon: <ScheduleIcon className={styles.icon} />, href: '/dashboard/schedule' },
  { id: 'settings', label: 'Настройки', icon: <SettingsIcon className={styles.icon} />, href: '/dashboard/settings' },
];


const RightMenu: React.FC = () => {
  const pathname = usePathname(); // Получаем текущий путь

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoSection}>
        <h1 className={styles.logoTitle}>BIM-HUB</h1>
        <p className={styles.logoSubtitle}>Центр управления проектами</p>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {menuItems.map((item) => (
            <li key={item.id} className={styles.navItem}>
              <Link
                href={item.href}
                className={`${styles.navLink} ${
                  pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
                    ? styles.active
                    : ''
                }`}
              >
                <span className={styles.iconWrapper}>{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.supportSection}>
        <div className={styles.supportContainer}>
          <p className={styles.supportTitle}>Техническая поддержка</p>
          <p className={styles.supportHours}>Часы работы: с 9:00 до 18:00</p>
        </div>
      </div>
    </aside>
  );
};

export default RightMenu;