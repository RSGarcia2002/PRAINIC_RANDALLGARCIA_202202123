Table Usuarios {
    id_usuario INT [primary key, increment]
    registro_academico VARCHAR(15) [unique, not null]
    nombres VARCHAR(100) [not null]
    apellidos VARCHAR(100) [not null]
    correo VARCHAR(100) [unique, not null]
    contraseña VARCHAR(255) [not null]
}

Table Catedraticos {
    id_catedratico INT [primary key, increment]
    nombre VARCHAR(100) [not null]
    apellidos VARCHAR(100) [not null]
}

Table Cursos {
    id_curso INT [primary key, increment]
    nombre VARCHAR(100) [not null]
    codigo VARCHAR(10) [unique, not null]
}

Table Publicaciones {
    id_publicacion INT [primary key, increment]
    id_usuario INT [not null]
    id_curso INT [null]  
    id_catedratico INT [null]  
    mensaje TEXT [not null]
    fecha_creacion TIMESTAMP
}

Table Comentarios {
    id_comentario INT [primary key, increment]
    id_publicacion INT [not null]
    id_usuario INT [not null]
    mensaje TEXT [not null]
    fecha_creacion TIMESTAMP
}

Table Cursos_Aprobados {
    id_usuario INT [not null]
    id_curso INT [not null]
    Primary Key (id_usuario, id_curso)
}

Ref: Publicaciones.id_usuario > Usuarios.id_usuario
Ref: Publicaciones.id_curso > Cursos.id_curso
Ref: Publicaciones.id_catedratico > Catedraticos.id_catedratico

Ref: Comentarios.id_publicacion > Publicaciones.id_publicacion
Ref: Comentarios.id_usuario > Usuarios.id_usuario

Ref: Cursos_Aprobados.id_usuario > Usuarios.id_usuario
Ref: Cursos_Aprobados.id_curso > Cursos.id_curso
