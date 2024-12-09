--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Ubuntu 12.9-2.pgdg20.04+1)
-- Dumped by pg_dump version 12.9 (Ubuntu 12.9-2.pgdg20.04+1)

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

DROP DATABASE worldcup;
--
-- Name: worldcup; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE worldcup WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE worldcup OWNER TO freecodecamp;

\connect worldcup

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
-- Name: games; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.games (
    game_id integer NOT NULL,
    year integer NOT NULL,
    round character varying(100) NOT NULL,
    winner_id integer NOT NULL,
    opponent_id integer NOT NULL,
    winner_goals integer NOT NULL,
    opponent_goals integer NOT NULL
);


ALTER TABLE public.games OWNER TO freecodecamp;

--
-- Name: games_game_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.games_game_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.games_game_id_seq OWNER TO freecodecamp;

--
-- Name: games_game_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.games_game_id_seq OWNED BY public.games.game_id;


--
-- Name: teams; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.teams (
    team_id integer NOT NULL,
    name character varying(30) NOT NULL
);


ALTER TABLE public.teams OWNER TO freecodecamp;

--
-- Name: teams_team_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.teams_team_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.teams_team_id_seq OWNER TO freecodecamp;

--
-- Name: teams_team_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.teams_team_id_seq OWNED BY public.teams.team_id;


--
-- Name: games game_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games ALTER COLUMN game_id SET DEFAULT nextval('public.games_game_id_seq'::regclass);


--
-- Name: teams team_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.teams ALTER COLUMN team_id SET DEFAULT nextval('public.teams_team_id_seq'::regclass);


--
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.games VALUES (65, 2018, 'Final', 138, 139, 4, 2);
INSERT INTO public.games VALUES (66, 2018, 'Third Place', 140, 141, 2, 0);
INSERT INTO public.games VALUES (67, 2018, 'Semi-Final', 139, 141, 2, 1);
INSERT INTO public.games VALUES (68, 2018, 'Semi-Final', 138, 140, 1, 0);
INSERT INTO public.games VALUES (69, 2018, 'Quarter-Final', 139, 142, 3, 2);
INSERT INTO public.games VALUES (70, 2018, 'Quarter-Final', 141, 143, 2, 0);
INSERT INTO public.games VALUES (71, 2018, 'Quarter-Final', 140, 144, 2, 1);
INSERT INTO public.games VALUES (72, 2018, 'Quarter-Final', 138, 145, 2, 0);
INSERT INTO public.games VALUES (73, 2018, 'Eighth-Final', 141, 146, 2, 1);
INSERT INTO public.games VALUES (74, 2018, 'Eighth-Final', 143, 147, 1, 0);
INSERT INTO public.games VALUES (75, 2018, 'Eighth-Final', 140, 148, 3, 2);
INSERT INTO public.games VALUES (76, 2018, 'Eighth-Final', 144, 149, 2, 0);
INSERT INTO public.games VALUES (77, 2018, 'Eighth-Final', 139, 150, 2, 1);
INSERT INTO public.games VALUES (78, 2018, 'Eighth-Final', 142, 151, 2, 1);
INSERT INTO public.games VALUES (79, 2018, 'Eighth-Final', 145, 152, 2, 1);
INSERT INTO public.games VALUES (80, 2018, 'Eighth-Final', 138, 153, 4, 3);
INSERT INTO public.games VALUES (81, 2014, 'Final', 154, 153, 1, 0);
INSERT INTO public.games VALUES (82, 2014, 'Third Place', 155, 144, 3, 0);


--
-- Data for Name: teams; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.teams VALUES (138, 'France');
INSERT INTO public.teams VALUES (139, 'Croatia');
INSERT INTO public.teams VALUES (140, 'Belgium');
INSERT INTO public.teams VALUES (141, 'England');
INSERT INTO public.teams VALUES (142, 'Russia');
INSERT INTO public.teams VALUES (143, 'Sweden');
INSERT INTO public.teams VALUES (144, 'Brazil');
INSERT INTO public.teams VALUES (145, 'Uruguay');
INSERT INTO public.teams VALUES (146, 'Colombia');
INSERT INTO public.teams VALUES (147, 'Switzerland');
INSERT INTO public.teams VALUES (148, 'Japan');
INSERT INTO public.teams VALUES (149, 'Mexico');
INSERT INTO public.teams VALUES (150, 'Denmark');
INSERT INTO public.teams VALUES (151, 'Spain');
INSERT INTO public.teams VALUES (152, 'Portugal');
INSERT INTO public.teams VALUES (153, 'Argentina');
INSERT INTO public.teams VALUES (154, 'Germany');
INSERT INTO public.teams VALUES (155, 'Netherlands');


--
-- Name: games_game_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.games_game_id_seq', 82, true);


--
-- Name: teams_team_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.teams_team_id_seq', 155, true);


--
-- Name: games games_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (game_id);


--
-- Name: teams teams_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_name_key UNIQUE (name);


--
-- Name: teams teams_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_pkey PRIMARY KEY (team_id);


--
-- Name: games games_opponent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_opponent_id_fkey FOREIGN KEY (opponent_id) REFERENCES public.teams(team_id);


--
-- Name: games games_winner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_winner_id_fkey FOREIGN KEY (winner_id) REFERENCES public.teams(team_id);


--
-- PostgreSQL database dump complete
--

