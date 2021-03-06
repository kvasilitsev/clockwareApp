PGDMP         (        
        z           clockwise_db     14.0 (Ubuntu 14.0-1.pgdg20.04+1)     14.0 (Ubuntu 14.0-1.pgdg20.04+1) 3    <           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            =           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            >           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    16384    clockwise_db    DATABASE     a   CREATE DATABASE clockwise_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';
    DROP DATABASE clockwise_db;
                postgres    false            ?            1259    16394    cities    TABLE     G   CREATE TABLE public.cities (
    id integer NOT NULL,
    name text
);
    DROP TABLE public.cities;
       public         heap    postgres    false            ?            1259    16397    cities_UniqueID_seq    SEQUENCE     ?   ALTER TABLE public.cities ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."cities_UniqueID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    211            ?            1259    16467    clocks_sizes    TABLE     k   CREATE TABLE public.clocks_sizes (
    id integer NOT NULL,
    size text,
    repair_duration interval
);
     DROP TABLE public.clocks_sizes;
       public         heap    postgres    false            ?            1259    16385    masters    TABLE     \   CREATE TABLE public.masters (
    id integer NOT NULL,
    name text,
    rating integer
);
    DROP TABLE public.masters;
       public         heap    postgres    false            ?            1259    16388    master_UniqueID_seq    SEQUENCE     ?   ALTER TABLE public.masters ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."master_UniqueID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    209            ?            1259    24721    masters_cities    TABLE     l   CREATE TABLE public.masters_cities (
    id integer NOT NULL,
    master_id integer,
    city_id integer
);
 "   DROP TABLE public.masters_cities;
       public         heap    postgres    false            ?            1259    16403    orders    TABLE     ?   CREATE TABLE public.orders (
    id integer NOT NULL,
    user_id integer,
    master_id integer,
    city_id integer,
    booking_time timestamp without time zone,
    booking_date date,
    clock_sizes_id integer
);
    DROP TABLE public.orders;
       public         heap    postgres    false            ?            1259    16406    orders_UniqueID_seq    SEQUENCE     ?   ALTER TABLE public.orders ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."orders_UniqueID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    213            ?            1259    16412    users    TABLE     ?   CREATE TABLE public.users (
    id integer NOT NULL,
    name text,
    email text,
    admin boolean,
    city_id integer,
    orders_id integer
);
    DROP TABLE public.users;
       public         heap    postgres    false            3          0    16394    cities 
   TABLE DATA           *   COPY public.cities (id, name) FROM stdin;
    public          postgres    false    211   q8       8          0    16467    clocks_sizes 
   TABLE DATA           A   COPY public.clocks_sizes (id, size, repair_duration) FROM stdin;
    public          postgres    false    216   ?8       1          0    16385    masters 
   TABLE DATA           3   COPY public.masters (id, name, rating) FROM stdin;
    public          postgres    false    209   ?8       9          0    24721    masters_cities 
   TABLE DATA           @   COPY public.masters_cities (id, master_id, city_id) FROM stdin;
    public          postgres    false    217   9       5          0    16403    orders 
   TABLE DATA           m   COPY public.orders (id, user_id, master_id, city_id, booking_time, booking_date, clock_sizes_id) FROM stdin;
    public          postgres    false    213   69       7          0    16412    users 
   TABLE DATA           K   COPY public.users (id, name, email, admin, city_id, orders_id) FROM stdin;
    public          postgres    false    215   S9       @           0    0    cities_UniqueID_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."cities_UniqueID_seq"', 12, true);
          public          postgres    false    212            A           0    0    master_UniqueID_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."master_UniqueID_seq"', 9, true);
          public          postgres    false    210            B           0    0    orders_UniqueID_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."orders_UniqueID_seq"', 1, false);
          public          postgres    false    214                       2606    16420    cities cities_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.cities
    ADD CONSTRAINT cities_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.cities DROP CONSTRAINT cities_pkey;
       public            postgres    false    211            ?           2606    24704    cities cityid_uc 
   CONSTRAINT     I   ALTER TABLE ONLY public.cities
    ADD CONSTRAINT cityid_uc UNIQUE (id);
 :   ALTER TABLE ONLY public.cities DROP CONSTRAINT cityid_uc;
       public            postgres    false    211            ?           2606    16560    cities cityname_uc 
   CONSTRAINT     M   ALTER TABLE ONLY public.cities
    ADD CONSTRAINT cityname_uc UNIQUE (name);
 <   ALTER TABLE ONLY public.cities DROP CONSTRAINT cityname_uc;
       public            postgres    false    211            ?           2606    16471    clocks_sizes clock_sizes_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.clocks_sizes
    ADD CONSTRAINT clock_sizes_pkey PRIMARY KEY (id);
 G   ALTER TABLE ONLY public.clocks_sizes DROP CONSTRAINT clock_sizes_pkey;
       public            postgres    false    216            ?           2606    24706    clocks_sizes clockid_uc 
   CONSTRAINT     P   ALTER TABLE ONLY public.clocks_sizes
    ADD CONSTRAINT clockid_uc UNIQUE (id);
 A   ALTER TABLE ONLY public.clocks_sizes DROP CONSTRAINT clockid_uc;
       public            postgres    false    216            ?           2606    24708    clocks_sizes clocksize_uc 
   CONSTRAINT     T   ALTER TABLE ONLY public.clocks_sizes
    ADD CONSTRAINT clocksize_uc UNIQUE (size);
 C   ALTER TABLE ONLY public.clocks_sizes DROP CONSTRAINT clocksize_uc;
       public            postgres    false    216            {           2606    24712    masters masterid_uc 
   CONSTRAINT     L   ALTER TABLE ONLY public.masters
    ADD CONSTRAINT masterid_uc UNIQUE (id);
 =   ALTER TABLE ONLY public.masters DROP CONSTRAINT masterid_uc;
       public            postgres    false    209            }           2606    16418    masters masters_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.masters
    ADD CONSTRAINT masters_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.masters DROP CONSTRAINT masters_pkey;
       public            postgres    false    209            ?           2606    24725 !   masters_cities masterscities_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.masters_cities
    ADD CONSTRAINT masterscities_pkey PRIMARY KEY (id);
 K   ALTER TABLE ONLY public.masters_cities DROP CONSTRAINT masterscities_pkey;
       public            postgres    false    217            ?           2606    24714    orders orderid_uc 
   CONSTRAINT     J   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orderid_uc UNIQUE (id);
 ;   ALTER TABLE ONLY public.orders DROP CONSTRAINT orderid_uc;
       public            postgres    false    213            ?           2606    16435    orders orders_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            postgres    false    213            ?           2606    24710    clocks_sizes repairduration_uc 
   CONSTRAINT     d   ALTER TABLE ONLY public.clocks_sizes
    ADD CONSTRAINT repairduration_uc UNIQUE (repair_duration);
 H   ALTER TABLE ONLY public.clocks_sizes DROP CONSTRAINT repairduration_uc;
       public            postgres    false    216            ?           2606    24720    users useremail_uc 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT useremail_uc UNIQUE (email);
 <   ALTER TABLE ONLY public.users DROP CONSTRAINT useremail_uc;
       public            postgres    false    215            ?           2606    24716    users userid_uc 
   CONSTRAINT     H   ALTER TABLE ONLY public.users
    ADD CONSTRAINT userid_uc UNIQUE (id);
 9   ALTER TABLE ONLY public.users DROP CONSTRAINT userid_uc;
       public            postgres    false    215            ?           2606    16428    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    215            ?           1259    24737    fki_cityid_fk    INDEX     K   CREATE INDEX fki_cityid_fk ON public.masters_cities USING btree (city_id);
 !   DROP INDEX public.fki_cityid_fk;
       public            postgres    false    217            ?           1259    16490    fki_clock_sizes_id    INDEX     O   CREATE INDEX fki_clock_sizes_id ON public.orders USING btree (clock_sizes_id);
 &   DROP INDEX public.fki_clock_sizes_id;
       public            postgres    false    213            ?           1259    16447    fki_master_id    INDEX     E   CREATE INDEX fki_master_id ON public.orders USING btree (master_id);
 !   DROP INDEX public.fki_master_id;
       public            postgres    false    213            ?           1259    24731    fki_masterid_fk    INDEX     O   CREATE INDEX fki_masterid_fk ON public.masters_cities USING btree (master_id);
 #   DROP INDEX public.fki_masterid_fk;
       public            postgres    false    217            ?           1259    16496    fki_orders_id    INDEX     D   CREATE INDEX fki_orders_id ON public.users USING btree (orders_id);
 !   DROP INDEX public.fki_orders_id;
       public            postgres    false    215            ?           1259    16441    fki_user_id    INDEX     A   CREATE INDEX fki_user_id ON public.orders USING btree (user_id);
    DROP INDEX public.fki_user_id;
       public            postgres    false    213            ?           2606    16429    users city_id    FK CONSTRAINT     w   ALTER TABLE ONLY public.users
    ADD CONSTRAINT city_id FOREIGN KEY (city_id) REFERENCES public.cities(id) NOT VALID;
 7   ALTER TABLE ONLY public.users DROP CONSTRAINT city_id;
       public          postgres    false    211    215    3199            ?           2606    16462    orders city_id    FK CONSTRAINT     x   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT city_id FOREIGN KEY (city_id) REFERENCES public.cities(id) NOT VALID;
 8   ALTER TABLE ONLY public.orders DROP CONSTRAINT city_id;
       public          postgres    false    211    213    3199            ?           2606    24732    masters_cities cityid_fk    FK CONSTRAINT     ?   ALTER TABLE ONLY public.masters_cities
    ADD CONSTRAINT cityid_fk FOREIGN KEY (city_id) REFERENCES public.cities(id) NOT VALID;
 B   ALTER TABLE ONLY public.masters_cities DROP CONSTRAINT cityid_fk;
       public          postgres    false    3199    211    217            ?           2606    16485    orders clock_sizes_id    FK CONSTRAINT     ?   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT clock_sizes_id FOREIGN KEY (clock_sizes_id) REFERENCES public.clocks_sizes(id) NOT VALID;
 ?   ALTER TABLE ONLY public.orders DROP CONSTRAINT clock_sizes_id;
       public          postgres    false    213    3219    216            ?           2606    16442    orders master_id    FK CONSTRAINT     }   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT master_id FOREIGN KEY (master_id) REFERENCES public.masters(id) NOT VALID;
 :   ALTER TABLE ONLY public.orders DROP CONSTRAINT master_id;
       public          postgres    false    213    3197    209            ?           2606    24726    masters_cities masterid_fk    FK CONSTRAINT     ?   ALTER TABLE ONLY public.masters_cities
    ADD CONSTRAINT masterid_fk FOREIGN KEY (master_id) REFERENCES public.masters(id) NOT VALID;
 D   ALTER TABLE ONLY public.masters_cities DROP CONSTRAINT masterid_fk;
       public          postgres    false    217    3197    209            ?           2606    16491    users orders_id    FK CONSTRAINT     {   ALTER TABLE ONLY public.users
    ADD CONSTRAINT orders_id FOREIGN KEY (orders_id) REFERENCES public.orders(id) NOT VALID;
 9   ALTER TABLE ONLY public.users DROP CONSTRAINT orders_id;
       public          postgres    false    3210    215    213            ?           2606    16436    orders user_id    FK CONSTRAINT     w   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(id) NOT VALID;
 8   ALTER TABLE ONLY public.orders DROP CONSTRAINT user_id;
       public          postgres    false    213    3217    215            3   ,   x?3???H?/?O?24???H-*???2?t??,(??????? ?
D      8      x?????? ? ?      1   ?   x?3?tO?/JO?4?2???L?HL??4?2??OJ-*2M9sR+8???8RKR???=... ?[X      9      x?????? ? ?      5      x?????? ? ?      7   R   x?3?t+J?????L?vH?M???K???L?4????2??M,???(?? Icΐ??J? ?)i?\?Z??Y"1????? :?$?     