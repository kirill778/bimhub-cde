"use client"; // Указывает, что компонент работает на клиенте (Next.js 13+)

import React, { useState } from 'react'; // Импорт React для JSX
import Link from 'next/link'; // Импорт компонента Link для навигации между страницами
import { usePathname } from 'next/navigation'; // Хук для получения текущего пути (URL)
import styles from '@/app/dashboard/RightMenu.module.scss'; // Импорт CSS-модуля для стилизации
import ProjectsIcon from '@/assets/icons/ix_projects.svg'; // SVG-иконка для "Проекты"
import ModelsIcon from '@/assets/icons/mingcute_cube-3d-line.svg'; // SVG-иконка для "Модели"
import DocumentsIcon from '@/assets/icons/material-symbols-light_docs-outline.svg'; // SVG-иконка для "Документы"
import TeamIcon from '@/assets/icons/mdi_people-outline.svg'; // SVG-иконка для "Команда"
import ChatsIcon from '@/assets/icons/majesticons_chats.svg'; // SVG-иконка для "Чаты"
import ScheduleIcon from '@/assets/icons/uil_schedule.svg'; // SVG-иконка для "Расписание"
import SettingsIcon from '@/assets/icons/material-symbols_settings-outline.svg'; // SVG-иконка для "Настройки"

// Интерфейс для подпунктов меню
interface SubMenuItemData {
    id: string;
    label: string;
    href: string;
  }

// Интерфейс для описания структуры пункта меню
interface MenuItemData {
  id: string; // Уникальный идентификатор пункта меню
  label: string; // Текстовая подпись пункта меню
  icon: React.ReactNode; // Иконка пункта меню (SVG)
  href: string; // Ссылка для перехода
  subMenuItems?: SubMenuItemData[]; // Подпункты меню
}

// Массив данных для пунктов меню
const menuItems: MenuItemData[] = [
  { 
    id: 'projects', 
    label: 'Проекты', 
    icon: <ProjectsIcon className={styles.icon} />, 
    href: '/dashboard/projects',
    subMenuItems: [
      { id: 'project1', label: 'Проект 1', href: '/dashboard/projects/project1' },
      { id: 'project2', label: 'Проект 2', href: '/dashboard/projects/project2' },
      { id: 'project3', label: 'Проект 3', href: '/dashboard/projects/project3' },
    ]
  }, // Пункт "Проекты"
  { 
    id: 'models', 
    label: 'Модели', 
    icon: <ModelsIcon className={styles.icon} />, 
    href: '/dashboard/models' 
  }, // Пункт "Модели"
  { 
    id: 'documents', 
    label: 'Управление документами', 
    icon: <DocumentsIcon className={styles.icon} />, 
    href: '/dashboard/documents' 
  }, // Пункт "Документы"
  { 
    id: 'team', 
    label: 'Команда', 
    icon: <TeamIcon className={styles.icon} />, 
    href: '/dashboard/team' 
  }, // Пункт "Команда"
  { 
    id: 'chats', 
    label: 'Чаты', 
    icon: <ChatsIcon className={styles.icon} />, 
    href: '/dashboard/chats' 
  }, // Пункт "Чаты"
  { 
    id: 'schedule', 
    label: 'Расписание', 
    icon: <ScheduleIcon className={styles.icon} />, 
    href: '/dashboard/schedule' 
  }, // Пункт "Расписание"
  { 
    id: 'settings', 
    label: 'Настройки', 
    icon: <SettingsIcon className={styles.icon} />, 
    href: '/dashboard/settings' 
  } // Пункт "Настройки"
];

// Основной компонент бокового меню
const RightMenu: React.FC = () => {
  const pathname = usePathname(); // Получаем текущий путь для определения активного пункта меню

  const [isProjectsSubMenuOpen, setIsProjectsSubMenuOpen] = useState(false); // Состояние для хранения активного подпункта

  const toggleProjectsSubMenu = (event: React.MouseEvent) => {
    event.preventDefault(); // Предотвращаем стандартное поведение ссылки
    setIsProjectsSubMenuOpen(!isProjectsSubMenuOpen); // Меняем состояние активности подпункта
  };

  return (
    <aside className={styles.sidebar}> {/* Контейнер сайдбара */}
      <div className={styles.logoSection}> {/* Секция логотипа */}
        <h1 className={styles.logoTitle}>BIM-HUB</h1> {/* Название приложения */}
        <p className={styles.logoSubtitle}>Центр управления проектами</p> {/* Подзаголовок */}
      </div>

      <nav className={styles.nav}> {/* Навигационное меню */}
        <ul className={styles.navList}> {/* Список пунктов меню */}
          {menuItems.map((item) => {
            const isProjectsItemWithSubMenu = item.id === 'projects'; // Проверяем, является ли пункт меню "Проекты"
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href)); // Определяем, является ли пункт меню активным
             return (
                <li
                  key={item.id}
                  className={`${styles.navItem} ${
                    isProjectsItemWithSubMenu && isProjectsSubMenuOpen ? styles.navItemOpen : '' // Добавим класс, если подменю открыто
                  }`}
                >
                  {isProjectsItemWithSubMenu ? (
                    // Рендерим ПУНКТ С ВЫПАДАЮЩИM СПИСКОМ (для "Проектов")
                    <>
                      <button
                        type="button"
                        onClick={toggleProjectsSubMenu}
                        className={`${styles.navLink} ${styles.navLinkDropdownToggle} ${isActive ? styles.active : ''} ${
                          isProjectsSubMenuOpen ? styles.open : ''
                        }`}
                        aria-expanded={isProjectsSubMenuOpen}
                        aria-controls={`submenu-${item.id}`} // Для доступности
                      >
                        <span className={styles.iconWrapper}>{item.icon}</span>
                        {item.label}
                        <span className={`${styles.dropdownArrow} ${isProjectsSubMenuOpen ? styles.open : ''}`}>
                          › {/* Простая стрелка, можно заменить на SVG */}
                        </span>
                      </button>
                      {isProjectsSubMenuOpen && (
                        <ul id={`submenu-${item.id}`} className={styles.subNavList}>
                          {item.subMenuItems!.map((subItem) => ( // Используем ! т.к. isProjectsItemWithSubMenu гарантирует наличие subMenuItems
                            <li key={subItem.id} className={styles.subNavItem}>
                              <Link
                                href={subItem.href}
                                className={`${styles.navLink} ${styles.subNavLink} ${
                                  pathname === subItem.href ? styles.active : ''
                                }`}
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    // Рендерим ОБЫЧНЫЙ ПУНКТ МЕНЮ (без выпадающего списка)
                    <Link
                      href={item.href}
                      className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                    >
                      <span className={styles.iconWrapper}>{item.icon}</span>
                      {item.label}
                    </Link>
                  )}
                </li>
              );
          })}
        </ul>
      </nav>

      <div className={styles.supportSection}> {/* Секция поддержки */}
        <div className={styles.supportContainer}> {/* Контейнер для текста поддержки */}
          <p className={styles.supportTitle}>Техническая поддержка</p> {/* Заголовок поддержки */}
          <p className={styles.supportHours}>Часы работы: с 9:00 до 18:00</p> {/* Время работы поддержки */}
        </div>
      </div>
    </aside>
  );
};

export default RightMenu; // Экспорт компонента для использования в других частях приложения