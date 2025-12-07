const skillsSection = document.querySelector('.section-skills');
const skillList = skillsSection ? skillsSection.querySelector('dl.skill-list') : null;
const sortBtnsBlock = skillsSection ? skillsSection.querySelector('.skills-sort') : null;

const skills = {
	data: [],

	generateList(parentElement) {
		// очистка контейнера
		parentElement.innerHTML = '';
		this.data.forEach(skill => {
			// создание элементов
			const dt = document.createElement('dt');
			const dd = document.createElement('dd');
			const skillLevel = document.createElement('div');
			const progressBar = document.createElement('div');

			// классы
			dt.classList.add('skill-item');
			skillLevel.classList.add('skill-level');

			dt.textContent = skill.name;
			progressBar.textContent = `${skill.level}%`;
			progressBar.style.width = `${skill.level}%`;
			dt.style.backgroundImage = `url('./img/${skill.icon}')`;

			// элементы
			skillLevel.appendChild(progressBar);
			dd.appendChild(skillLevel);

			// добавил на страницу
			parentElement.appendChild(dt);
			parentElement.appendChild(dd);
		});
	},

	sortMode: null,

	getData(pathToJSON) {
		fetch(pathToJSON)
			.then(data => data.json())
			.then(object => {
				this.data = object;
				if (!this.data.length) {
					if (skillsSection) {
						skillsSection.classList.add('section-skills_hidden');
					}
					return;
				}
				if (skillList && skillsSection) {
					skillsSection.classList.remove('section-skills_hidden');
					this.generateList(skillList);
				}
			})
			.catch(() => {
				console.error('что-то пошло не так');
				if (skillsSection) {
					skillsSection.classList.add('section-skills_hidden');
				}
			});
	},

	sortList(type) {
		const prop = type === 'level' ? 'level' : 'name';
		if (this.sortMode !== type) {
			if (type === 'level') {
				this.data.sort((a, b) => getComparer('level')(b, a));
			} else {
				this.data.sort(getComparer(prop));
			}
			this.sortMode = type;
		} else {
			this.data.reverse();
		}
		if (skillList) {
			this.generateList(skillList);
		}
	}
}

skills.getData('db/skills.json');

// обработчик клика
if (sortBtnsBlock) {
	sortBtnsBlock.addEventListener('click', (e) => {
		if (e.target && e.target.nodeName === 'BUTTON') {
			let target = e.target;
			switch (target.dataset.type) {
				case 'name':
					skills.sortList('name');
					break;
				case 'level':
					skills.sortList('level');
					break;
				default:
			}
		}
	})
}

function getComparer(prop) {
	return function (a, b) {
		if (a[prop] < b[prop]) {
			return -1;
		}
		if (a[prop] > b[prop]) {
			return 1;
		}
		return 0;
	}
}

// меню
const mainNav = document.querySelector('.main-nav');
const navBtn = document.querySelector('.nav-btn');

if (mainNav && navBtn) {
	const menu = {
		open() {
			mainNav.classList.remove('main-nav_closed');
			navBtn.classList.remove('nav-btn_open');
			navBtn.classList.add('nav-btn_close');
			navBtn.innerHTML = '<span class="visually-hidden">Закрыть меню</span>';
		},
		close() {
			mainNav.classList.add('main-nav_closed');
			navBtn.classList.remove('nav-btn_close');
			navBtn.classList.add('nav-btn_open');
			navBtn.innerHTML = '<span class="visually-hidden">Открыть меню</span>';
		}
	};

	menu.close();

	navBtn.addEventListener('click', (e) => {
		const btn = e.currentTarget;
		if (btn && btn.classList.contains('nav-btn_open')) {
			menu.open();
		} else {
			menu.close();
		}
	});
}


// переключатель темы
const checkbox = document.querySelector('.switch-checkbox');

if (checkbox) {
	// Проверка localStorage при загрузке
	if (localStorage.getItem('theme') === 'light') {
		document.body.classList.remove('dark-theme');
		checkbox.checked = true;
	} else {
		document.body.classList.add('dark-theme');
		checkbox.checked = false;
	}

	// Обработчик изменения
	checkbox.addEventListener('change', function () {
		if (this.checked) {
			document.body.classList.remove('dark-theme');
			localStorage.setItem('theme', 'light');
		} else {
			document.body.classList.add('dark-theme');
			localStorage.setItem('theme', 'dark');
		}
	});
}
