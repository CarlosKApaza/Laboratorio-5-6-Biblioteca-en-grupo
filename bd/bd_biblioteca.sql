-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-06-2026 a las 09:08:29
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_biblioteca`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libros`
--

CREATE TABLE `libros` (
  `id` int(11) NOT NULL,
  `titulo` varchar(200) NOT NULL,
  `autor` varchar(150) NOT NULL,
  `isbn` varchar(20) DEFAULT NULL,
  `categoria` varchar(80) DEFAULT NULL,
  `stock` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `libros`
--

INSERT INTO `libros` (`id`, `titulo`, `autor`, `isbn`, `categoria`, `stock`) VALUES
(34, 'Clean Code: Código Limpio', 'Robert C. Martin', '978-0132350884', 'Ingeniería de Software', 5),
(35, 'Sistemas Operativos Modernos', 'Andrew S. Tanenbaum', '978-6073214036', 'Sistemas Operativos', 3),
(36, 'Redes de Computadoras: Un Enfoque Descendente', 'James F. Kurose', '978-8490355282', 'Redes e Infraestructura', 4),
(37, 'Patrones de Diseño (Design Patterns)', 'Erich Gamma', '978-8478290598', 'Arquitectura de Software', 2),
(38, 'Desarrollo Web con PHP y MySQL', 'Luke Welling', '978-8441539276', 'Desarrollo Web', 6),
(39, 'Hacking Ético y Pruebas de Penetración', 'Rafay Baloch', '978-1138777415', 'Ciberseguridad', 3),
(40, 'Sistemas Distribuidos: Conceptos y Diseño', 'George Coulouris', '978-8478290833', 'Sistemas Distribuidos', 4),
(41, 'Fundamentos de Robótica y Arduino', 'Massimo Banzi', '978-1449313876', 'Electrónica', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prestamos`
--

CREATE TABLE `prestamos` (
  `id` int(11) NOT NULL,
  `id_libro` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha_prestamo` date NOT NULL,
  `fecha_devolucion` date DEFAULT NULL,
  `estado` enum('Activo','Devuelto','Vencido') DEFAULT 'Activo',
  `observaciones` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `carnet` varchar(20) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `carnet`, `telefono`, `correo`) VALUES
(6, 'Carlos Daniel Kevin Apaza Villca', '13057887', '63461251', 'kevin14apaza@gmail.com'),
(7, 'Gustavo Gabriel Apaza Albarado', '8765432', '71234567', 'gustavo.apaza@usfx.bo'),
(8, 'Laura Luciana Diaz Campo', '5432198', '69876543', 'laura.diaz@usfx.bo'),
(9, 'Joel Edilson Salinas Quispe', '6549871', '78901234', 'joel.salinas@usfx.bo'),
(10, 'Gabriel Orlando Cornejo Moscoso', '3216549', '61234567', 'gabriel.cornejo@usfx.bo'),
(12, 'Alexis James Apaza Villca', '1122334', '60001122', 'alexis.j@usfx.bo');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `libros`
--
ALTER TABLE `libros`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `isbn` (`isbn`);

--
-- Indices de la tabla `prestamos`
--
ALTER TABLE `prestamos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_libro` (`id_libro`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `carnet` (`carnet`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `libros`
--
ALTER TABLE `libros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `prestamos`
--
ALTER TABLE `prestamos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `prestamos`
--
ALTER TABLE `prestamos`
  ADD CONSTRAINT `prestamos_ibfk_1` FOREIGN KEY (`id_libro`) REFERENCES `libros` (`id`),
  ADD CONSTRAINT `prestamos_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
