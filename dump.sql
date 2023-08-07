--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3 (Ubuntu 15.3-0ubuntu0.23.04.1)
-- Dumped by pg_dump version 15.3 (Ubuntu 15.3-0ubuntu0.23.04.1)

-- Started on 2023-08-07 16:56:29 -03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 16945)
-- Name: urls; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "idUser" integer NOT NULL,
    "shortUrl" character varying(10) NOT NULL,
    url text NOT NULL,
    "visitCount" integer DEFAULT 0,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.urls OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16944)
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.urls_id_seq OWNER TO postgres;

--
-- TOC entry 3368 (class 0 OID 0)
-- Dependencies: 216
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- TOC entry 215 (class 1259 OID 16936)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    "linksCount" integer DEFAULT 0,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16935)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3369 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3209 (class 2604 OID 16948)
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- TOC entry 3206 (class 2604 OID 16939)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3362 (class 0 OID 16945)
-- Dependencies: 217
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.urls (id, "idUser", "shortUrl", url, "visitCount", "createdAt") FROM stdin;
2	1	zopRG2Iz_p	https://google.com.br	2	2023-08-07 05:56:47.30614
3	2	blG-uxCIsY	https://google.com.br	1	2023-08-07 05:58:07.682735
4	2	-mXa3ALEA6	https://gdoogle.com.br	0	2023-08-07 07:33:40.186905
5	1	fAqnTYekht	https://gdsdfsdfoogle.com.br	3	2023-08-07 08:06:19.662442
\.


--
-- TOC entry 3360 (class 0 OID 16936)
-- Dependencies: 215
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, "linksCount", "createdAt") FROM stdin;
2	Carlos	contato.gneto@gmail.com	$2b$10$eCaZFTl40d7W5jZKgGZk2u7Hm8OyJcu1jNdcQnp9uQSaw.wUuD9Qm	2	2023-08-07 05:57:48.44828
1	Carlos	contato.carloshg@gmail.com	$2b$10$tuEgaGg61jMYhUwZp5MqwexYS/e3NCUo/.tOrky4fwqiIT66HwQwO	2	2023-08-07 04:11:27.505521
\.


--
-- TOC entry 3370 (class 0 OID 0)
-- Dependencies: 216
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.urls_id_seq', 5, true);


--
-- TOC entry 3371 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- TOC entry 3215 (class 2606 OID 16954)
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- TOC entry 3213 (class 2606 OID 16943)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3216 (class 2606 OID 16955)
-- Name: urls urls_idUser_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES public.users(id);


-- Completed on 2023-08-07 16:56:29 -03

--
-- PostgreSQL database dump complete
--

