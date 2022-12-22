from utils import TestStates


help_message = '/cap - показать топ криптовалют по капитализации\n /lookfor 1 - посмотреть цену конкретной криптовалюты'

start_message = 'Добро пожаловать в crypto бот ! Для помощи введите команду /help'
invalid_key_message = 'Ключ "{key}" не подходит.\n' + help_message
state_set_own = 'Введите название криптовалюты: '
state_reset_message = 'Состояние успешно сброшено'
current_state_message = 'Текущее состояние - "{current_state}", что удовлетворяет условию "один из {states}"'

MESSAGES = {
    'start': start_message,
    'help': help_message,
    'invalid_key': invalid_key_message,
    'state_change': state_set_own,
    'state_reset': state_reset_message,
    'current_state': current_state_message,
}
